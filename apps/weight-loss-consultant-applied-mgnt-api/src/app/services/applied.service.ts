import {HttpStatus, Inject, Injectable} from '@nestjs/common';
import {DeleteResult, UpdateResult} from 'typeorm';
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {Observable} from "rxjs";
import {AppliedRepository} from "../repositories/applied.repository";
import {AppliedMapper} from "../mappers/applied.mapper";
import {
  CAMPAIGN_MANAGEMENT_SERVICE_NAME,
  CONTRACT_MANAGEMENT_SERVICE_NAME,
  PACKAGES_MANAGEMENT_SERVICE_NAME
} from "../../../../../constant";
import {AppliedEntity} from "../entities/applied.entity";
import {CampaignEntity} from "../entities/campaign.entity";
import {FIND_CAMPAIGN_BY_ID, UPDATE_STATUS_CAMPAIGN} from "../../../../common/routes/campaigns-management-routes";
import {PackageEntity} from "../entities/package.enttiy";
import {FIND_PACKAGE_BY_ID, UPDATE_STATUS_PACKAGE} from "../../../../common/routes/packages-management-routes";
import {CreateAppliedDto} from "../dtos/applied/create_applied_dto";
import {RpcExceptionModel} from "../../../../common/filters/rpc-exception.model";
import {UpdateAppliedDto} from "../dtos/applied/update_applied_dto";
import {UpdateStatusCampaignPayload} from "../../../../common/dtos/update-campaign-dto.payload";
import {
  ApprovePayload,
  ApproveResponse, CreateContractDto,
  UpdateStatusPackagePayload
} from "../../../../common/dtos/update-package-dto.payload";
import {CAMPAIGN_STATUS, CONTRACT_STATUS, PACKAGE_STATUS} from "../../../../common/utils";
import {CREATE_CONTRACT} from "../../../../common/routes/contract-management-service-routes";

@Injectable()
export class AppliedService {
  constructor(private readonly repository: AppliedRepository,
              private readonly mapper: AppliedMapper,
              @Inject(CAMPAIGN_MANAGEMENT_SERVICE_NAME)
              private readonly campaignServiceManagementProxy: ClientProxy,
              @Inject(PACKAGES_MANAGEMENT_SERVICE_NAME)
              private readonly packageServiceManagementProxy: ClientProxy,
              @Inject(CONTRACT_MANAGEMENT_SERVICE_NAME)
              private readonly contractServiceManagementProxy: ClientProxy) {
  }

  async findAll(): Promise<AppliedEntity[] | null> {
    return await this.repository.createQueryBuilder("apply")
      .leftJoinAndSelect("apply.campaign", "campaign")
      .leftJoinAndSelect("apply.package", "package")
      .getMany();

  }

  private validateCampaign(id: number): Observable<CampaignEntity> {
    return this.campaignServiceManagementProxy
      .send<CampaignEntity, number>({cmd: FIND_CAMPAIGN_BY_ID}, id);
  }

  private validatePackage(id: number): Observable<PackageEntity> {
    return this.packageServiceManagementProxy
      .send<PackageEntity, number>({cmd: FIND_PACKAGE_BY_ID}, id);
  }

  private updateCampaignStatus(payload: UpdateStatusCampaignPayload): Observable<boolean> {
    return this.campaignServiceManagementProxy
      .send({cmd: UPDATE_STATUS_CAMPAIGN}, payload);
  }

  private createContract(payload: { timeOfCreate: number; totalPrice: number; campaignID: number; packageID: number; timeOfExpired: number; status: CONTRACT_STATUS }): Observable<any> {
    return this.contractServiceManagementProxy
      .send({cmd: CREATE_CONTRACT}, payload);
  }

  private updatePackageStatus(payload: UpdateStatusPackagePayload): Observable<boolean> {
    return this.packageServiceManagementProxy
      .send({cmd: UPDATE_STATUS_PACKAGE}, payload);
  }

  async create(dto: CreateAppliedDto): Promise<AppliedEntity | null> {
    //1: create new apply
    const campaignID = dto.campaignID;
    const packageID = dto.packageID;
    const findCampaign = await this.validateCampaign(campaignID).toPromise();
    if (!findCampaign) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not campaign with id : ${campaignID}`
      } as RpcExceptionModel);
    }
    const findPackage = await this.validatePackage(packageID).toPromise();
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
    const updateCampaignResult = await this.updateCampaignStatus(campaignPayload).toPromise();
    console.log(updateCampaignResult)
    //3: update package status = APPLIED
    const packagePayload = {
      id: packageID,
      status: PACKAGE_STATUS.APPLIED
    } as UpdateStatusPackagePayload;
    const updatePackageResult = await this.updatePackageStatus(packagePayload).toPromise();
    console.log(updatePackageResult)
    if (updateCampaignResult && updatePackageResult) {
      return await this.repository.save(entity);
    }
    return null;
  }

  async edit(dto: UpdateAppliedDto, id: number): Promise<UpdateResult> {
    if (id != dto.id) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param id: ${id} must match with id in request body: ${dto.id}`
      } as RpcExceptionModel);
    }
    const campaignID = dto.campaignID;
    const findCampaign = await this.validateCampaign(campaignID).toPromise();
    if (!findCampaign) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found campaign with id: ${campaignID}`
      } as RpcExceptionModel);
    }
    const packageID = dto.packageID;
    const findPackage = await this.validatePackage(packageID).toPromise();
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
    const entity: AppliedEntity = await AppliedMapper.mapUpdateContractDtoToEntity(dto, findCampaign, findPackage);
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
    return await this.repository.delete(id);
  }

  async viewDetail(id): Promise<AppliedEntity> {
    const query = await this.repository.createQueryBuilder("applied")
      .where("applied.id = :id", {id: id})
      .leftJoinAndSelect("applied.campaign", "campaign")
      .leftJoinAndSelect("applied.package", "package")
      .getOne();
    return query;
  }

  async getAppliedPackagesByCampaignID(campaignID: number): Promise<any> {
    const query = await this.repository.createQueryBuilder("applied")
      .where("applied.campaignID = :id", {id: campaignID})
      .leftJoinAndSelect("applied.package", "package")
      .leftJoinAndSelect("package.trainer", "trainer")
      .getMany();
    return query;
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
    const updateStatusPackageResult: boolean = await this.updatePackageStatus(updateApprovePackagePayload).toPromise();
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
    const updateCampaignStatus: boolean = await this.updateCampaignStatus(updateCampaignPayload).toPromise();
    //7: create contract
    const campaign = await this.validateCampaign(campaignID).toPromise();
    const p = await this.validatePackage(packageID).toPromise();
    const contractPayload = {
      totalPrice: p.price,
      timeOfExpired: p.endDate,
      timeOfCreate: new Date().getTime(),
      status: CONTRACT_STATUS.ONGOING,
      campaignID: campaignID,
      packageID: packageID
    }
    const createContractResult = await this.createContract(contractPayload).toPromise();
    if (createContractResult) {
      return {
        message: "Approve successfully"
      } as ApproveResponse
    }
  }



}
