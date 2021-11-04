import { HttpStatus, Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { AppliedRepository } from '../repositories/applied.repository';
import { AppliedMapper } from '../mappers/applied.mapper';
import { AppliedEntity } from '../entities/applied.entity';
import { CampaignEntity } from '../entities/campaign.entity';
import { PackageEntity } from '../entities/package.enttiy';
import { CreateAppliedDto } from '../dtos/applied/create_applied_dto';
import { RpcExceptionModel } from '../../../../common/filters/rpc-exception.model';
import { UpdateAppliedDto } from '../dtos/applied/update_applied_dto';
import { UpdateStatusCampaignPayload } from '../../../../common/dtos/update-campaign-dto.payload';
import {
  ApprovePayload,
  ApproveResponse,
  UpdateStatusPackagePayload
} from '../../../../common/dtos/update-package-dto.payload';
import { CAMPAIGN_STATUS, CONTRACT_STATUS, PACKAGE_STATUS } from '../../../../common/utils';
import {
  KAFKA_CAMPAIGNS_MANAGEMENT_MESSAGE_PATTERN as CAMPAIGNS_MANAGEMENT_MESSAGE_PATTERN,
  KAFKA_CONTRACTS_MANAGEMENT_MESSAGE_PATTERN as CONTRACTS_MANAGEMENT_MESSAGE_PATTERN,
  KAFKA_PACKAGES_MANAGEMENT_MESSAGE_PATTERN as PACKAGE_MANAGEMENT_MESSAGE_PATTERN
} from '../../../../common/kafka-utils';

@Injectable()
export class AppliedService implements OnModuleInit, OnModuleDestroy {

  @Inject('SERVER')
  private readonly campaignsManagementClient: ClientKafka;

  @Inject('SERVER')
  private readonly packagesManagementClient: ClientKafka;

  @Inject('SERVER')
  private readonly contractsManagementClient: ClientKafka;

  constructor(private readonly repository: AppliedRepository) {}

  async onModuleInit() {
    for (const [key, value] of Object.entries(PACKAGE_MANAGEMENT_MESSAGE_PATTERN)) {
      this.packagesManagementClient.subscribeToResponseOf(value);
    }
    for (const [key, value] of Object.entries(CONTRACTS_MANAGEMENT_MESSAGE_PATTERN)) {
      this.contractsManagementClient.subscribeToResponseOf(value);
    }
    for (const [key, value] of Object.entries(CAMPAIGNS_MANAGEMENT_MESSAGE_PATTERN)) {
      this.campaignsManagementClient.subscribeToResponseOf(value);
    }
    await this.packagesManagementClient.connect();
    await this.contractsManagementClient.connect();
    await this.campaignsManagementClient.connect();
  }

  async onModuleDestroy() {
    await this.campaignsManagementClient.close();
    await this.packagesManagementClient.close();
    await this.contractsManagementClient.close();
  }

  async findAll(): Promise<AppliedEntity[]> {
    return this.repository.createQueryBuilder("apply")
      .leftJoinAndSelect("apply.campaign", "campaign")
      .leftJoinAndSelect("apply.package", "package")
      .getMany();
  }

  private validateCampaign(id: number): Observable<CampaignEntity> {
    return this.campaignsManagementClient
      .send<CampaignEntity, number>(CAMPAIGNS_MANAGEMENT_MESSAGE_PATTERN.getByID, id);
  }

  private validatePackage(id: number): Observable<PackageEntity> {
    return this.packagesManagementClient
      .send<PackageEntity, number>(PACKAGE_MANAGEMENT_MESSAGE_PATTERN.getByID, id);
  }

  private updateCampaignStatus(payload: UpdateStatusCampaignPayload): Observable<boolean> {
    return this.campaignsManagementClient
      .send(CAMPAIGNS_MANAGEMENT_MESSAGE_PATTERN.updateStatus, payload);
  }

  private createContract(payload: { timeOfCreate: number; totalPrice: number;
    campaignID: number; packageID: number; timeOfExpired: number;
    status: CONTRACT_STATUS }): Observable<any> {
    return this.contractsManagementClient
      .send(CONTRACTS_MANAGEMENT_MESSAGE_PATTERN.create, payload);
  }

  private updatePackageStatus(payload: UpdateStatusPackagePayload): Observable<boolean> {
    return this.packagesManagementClient
      .send(PACKAGE_MANAGEMENT_MESSAGE_PATTERN.updateStatus, payload);
  }

  async create(dto: CreateAppliedDto): Promise<AppliedEntity | null> {
    //1: create new apply
    const campaignID = dto.campaignID;
    const packageID = dto.packageID;
    const findCampaign = await lastValueFrom(this.validateCampaign(campaignID));
    if (!findCampaign) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not campaign with id : ${campaignID}`
      } as RpcExceptionModel);
    }
    const findPackage = await lastValueFrom(this.validatePackage(packageID));
    if (!findPackage) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not package with id : ${packageID}`
      } as RpcExceptionModel);
    }
    const entity: AppliedEntity = await AppliedMapper.mapCreateContractDtoToEntity(dto, findCampaign, findPackage);
    //2: update campaign Status = ACTIVE
    const campaignPayload = {
      id: campaignID,
      status: CAMPAIGN_STATUS.ACTIVE
    } as UpdateStatusCampaignPayload;
    const updateCampaignResult = await lastValueFrom(this.updateCampaignStatus(campaignPayload));
    //3: update package status = APPLIED
    const packagePayload = {
      id: packageID,
      status: PACKAGE_STATUS.APPLIED
    } as UpdateStatusPackagePayload;
    const updatePackageResult = await lastValueFrom(this.updatePackageStatus(packagePayload));
    if (updateCampaignResult && updatePackageResult) {
      return this.repository.save(entity);
    }
    throw new RpcException({
      statusCode: HttpStatus.NOT_FOUND,
      message: `Not package or campaign with id : ${packageID}`
    } as RpcExceptionModel);
  }

  async edit(dto: UpdateAppliedDto, id: number): Promise<UpdateResult> {
    if (id != dto.id) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param id: ${id} must match with id in request body: ${dto.id}`
      } as RpcExceptionModel);
    }
    const campaignID = dto.campaignID;
    const findCampaign = await lastValueFrom(this.validateCampaign(campaignID));
    if (!findCampaign) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found campaign with id: ${campaignID}`
      } as RpcExceptionModel);
    }
    const packageID = dto.packageID;
    const findPackage = await lastValueFrom(this.validatePackage(packageID));
    if (!findPackage) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found package with id: ${packageID}`
      } as RpcExceptionModel);
    }
    const existApplied = await this.viewDetail(dto.id);
    if (!existApplied) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found applied with id: ${id}`
      } as RpcExceptionModel);
    }
    const entity: AppliedEntity = await AppliedMapper
      .mapUpdateContractDtoToEntity(dto, findCampaign, findPackage);
    return await this.repository.update(id, entity);
  }

  async del(id): Promise<DeleteResult> {
    const existed = await this.viewDetail(id);
    if (!existed) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found applied with id: ${id}`
      } as RpcExceptionModel);
    }
    return this.repository.delete(id);
  }

  async viewDetail(id: number): Promise<AppliedEntity> {
    return this.repository.createQueryBuilder("applied")
      .where("applied.id = :id", {id: id})
      .leftJoinAndSelect("applied.campaign", "campaign")
      .leftJoinAndSelect("applied.package", "package")
      .getOneOrFail().catch((err) => {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Not found applied with id: ${id}`
        } as RpcExceptionModel);
      });
  }

  async getAppliedPackagesByCampaignID(campaignID: number): Promise<any> {
    return this.repository.createQueryBuilder("applied")
      .where("applied.campaignID = :id", {id: campaignID})
      .leftJoinAndSelect("applied.package", "package")
      .leftJoinAndSelect("package.trainer", "trainer")
      .getMany();
  }

  async approvePackageByCustomer(payload: ApprovePayload): Promise<any> {
    // : Promise<ApproveResponse>{
    const campaignID: number = payload.campaignID;
    const packageID: number = payload.packageID;

    //1: get packages that have campaign id
    const packages = await this.getAppliedPackagesByCampaignID(campaignID);
    //2: find in array package matched with packageID
    const result = packages.find((p) => p.package.id === packageID)
    //3: update status for that package
    const updateApprovePackagePayload = {
      id: packageID,
      status: PACKAGE_STATUS.APPROVED
    } as UpdateStatusPackagePayload;
    const updateStatusPackageResult: boolean = await lastValueFrom(this.
    updatePackageStatus(updateApprovePackagePayload));
    //4: update status packages (=> DECLINED) for those got decline in package list
    const declinePackages = packages.filter(p => p.package.id !== packageID);
    const updateDeclineResult = declinePackages.forEach(async (p) => {
      const updateDeclinePackagePayload = {
        id: p.package.id,
        status: PACKAGE_STATUS.DECLINED
      } as UpdateStatusPackagePayload;
      return await this.updatePackageStatus(updateDeclinePackagePayload).toPromise();
    })
    //5: update campaign status => ONGOING
    const updateCampaignPayload = {
      id: campaignID,
      status: CAMPAIGN_STATUS.ON_GOING
    } as UpdateStatusCampaignPayload
    const updateCampaignStatus: boolean = await lastValueFrom(this.updateCampaignStatus(updateCampaignPayload));
    //7: create contract
    const campaign = await lastValueFrom(this.validateCampaign(campaignID));
    const p = await lastValueFrom(this.validatePackage(packageID));
    const contractPayload = {
      totalPrice: p.price,
      timeOfExpired: p.endDate??0,
      timeOfCreate: new Date().getTime(),
      status: CONTRACT_STATUS.ONGOING,
      campaignID: campaignID,
      packageID: packageID
    }
    const createContractResult = await lastValueFrom(this.createContract(contractPayload));
    if (createContractResult) {
      return {
        message: "Approve successfully"
      } as ApproveResponse
    }
  }
}
