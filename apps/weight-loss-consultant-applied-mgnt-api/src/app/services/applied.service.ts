import {HttpStatus, Inject, Injectable} from '@nestjs/common';
import {DeleteResult, UpdateResult} from 'typeorm';
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {Observable} from "rxjs";
import {AppliedRepository} from "../repositories/applied.repository";
import {AppliedMapper} from "../mappers/applied.mapper";
import {CAMPAIGN_MANAGEMENT_SERVICE_NAME, PACKAGES_MANAGEMENT_SERVICE_NAME} from "../../../../../constant";
import {AppliedEntity} from "../entities/applied.entity";
import {CampaignEntity} from "../entities/campaign.entity";
import {FIND_CAMPAIGN_BY_ID} from "../../../../common/routes/campaigns-management-routes";
import {PackageEntity} from "../entities/package.enttiy";
import {FIND_PACKAGE_BY_ID} from "../../../../common/routes/packages-management-routes";
import {CreateAppliedDto} from "../dtos/applied/create_applied_dto";
import {RpcExceptionModel} from "../../../../common/filters/rpc-exception.model";
import {UpdateAppliedDto} from "../dtos/applied/update_applied_dto";

@Injectable()
export class AppliedService
{
  constructor(private readonly repository: AppliedRepository,
              private readonly mapper: AppliedMapper,
              @Inject(CAMPAIGN_MANAGEMENT_SERVICE_NAME)
              private readonly campaignServiceManagementProxy : ClientProxy,
              @Inject(PACKAGES_MANAGEMENT_SERVICE_NAME)
              private readonly packageServiceManagementProxy: ClientProxy
  ) {
  }

  async findAll(): Promise<AppliedEntity[] | null> {
    return await this.repository.createQueryBuilder("apply")
      .leftJoinAndSelect("apply.campaign", "campaign")
      .leftJoinAndSelect("apply.package", "package")
      .getMany();

  }

  private validateCampaign(id: number) : Observable<CampaignEntity> {
    return this.campaignServiceManagementProxy
      .send<CampaignEntity, number>({cmd: FIND_CAMPAIGN_BY_ID}, id);
  }

  private validatePackage(id : number) : Observable<PackageEntity> {
    return this.packageServiceManagementProxy
      .send<PackageEntity, number>({cmd: FIND_PACKAGE_BY_ID}, id);
  }

  async create(dto: CreateAppliedDto): Promise<AppliedEntity | null> {
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
    return await this.repository.save(entity);
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
    const entity: AppliedEntity = await AppliedMapper.mapUpdateContractDtoToEntity(dto,findCampaign, findPackage);
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

  async getAppliedPackagesByCampaignID(campaignID : number) : Promise<any> {
    const query = await this.repository.createQueryBuilder("applied")
      .where("applied.campaignID = :id", {id: campaignID})
      .leftJoinAndSelect("applied.package", "package")
      .leftJoinAndSelect("package.trainer", "trainer")
      .getMany();
    return query;
  }
}
