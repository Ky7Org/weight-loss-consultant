import {HttpStatus, Inject, Injectable} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import {ContractEntity} from "../../entities/contract.entity";
import {BaseService} from "../base.service";
import {ContractRepository} from "../../repositories/health-info.repository";
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {RpcExceptionModel} from "../../../../../common/filters/rpc-exception.model";
import {ContractMapper} from "../../mappers/health-info.mapper";
import {CreateContractDto} from "../../dtos/contract/create-health-info.dto";
import {UpdateContractDto} from "../../dtos/contract/update-health-info.dto";
import {
  CAMPAIGN_MANAGEMENT_SERVICE_NAME,
  PACKAGES_MANAGEMENT_SERVICE_NAME,
} from "../../../../../../constant";
import {CampaignEntity} from "../../entities/campaign.entity";
import {Observable} from "rxjs";
import {FIND_CAMPAIGN_BY_ID} from "../../../../../common/routes/campaigns-management-routes";
import {PackageEntity} from "../../entities/package.enttiy";
import {FIND_PACKAGE_BY_ID} from "../../../../../common/routes/packages-management-routes";

@Injectable()
export class ContractService
{
  constructor(private readonly repository: ContractRepository,
              private readonly mapper: ContractMapper,
              @Inject(CAMPAIGN_MANAGEMENT_SERVICE_NAME)
              private readonly campaignServiceManagementProxy : ClientProxy,
              @Inject(PACKAGES_MANAGEMENT_SERVICE_NAME)
              private readonly packageServiceManagementProxy: ClientProxy
  ) {
  }

  async findAll(): Promise<ContractEntity[] | null> {
    return await this.repository.find();
  }

  private validateCampaign(id: number) : Observable<CampaignEntity> {
    return this.campaignServiceManagementProxy
      .send<CampaignEntity, number>({cmd: FIND_CAMPAIGN_BY_ID}, id);
  }

  private validatePackage(id : number) : Observable<PackageEntity> {
    return this.packageServiceManagementProxy
      .send<PackageEntity, number>({cmd: FIND_PACKAGE_BY_ID}, id);
  }

  async create(dto: CreateContractDto): Promise<ContractEntity | null> {
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
    const entity: ContractEntity = await ContractMapper.mapCreateContractDtoToEntity(dto, findCampaign, findPackage);
    return await this.repository.save(entity);
  }

  async edit(dto: UpdateContractDto, id: number): Promise<UpdateResult> {
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
    const existContract = await this.viewDetail(dto.id);
    if (!existContract) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not contract with id: ${id}`
      } as RpcExceptionModel);
    }
    const entity: ContractEntity = await ContractMapper.mapUpdateContractDtoToEntity(dto,findCampaign, findPackage);
    return await this.repository.update(id, entity);
  }

  async del(id): Promise<DeleteResult> {
    const existContract = await this.viewDetail(id);
    if (!existContract) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found contract with id: ${id}`
      } as RpcExceptionModel);
    }
    return await this.repository.delete(id);
  }

  async viewDetail(id): Promise<ContractEntity> {
    const query = this.repository.createQueryBuilder("contract")
      .where("contract.id = :id", {id: id})
      .getOne();
    return query;
  }
}
