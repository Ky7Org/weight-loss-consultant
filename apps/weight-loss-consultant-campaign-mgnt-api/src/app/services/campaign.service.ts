import {ConflictException, HttpStatus, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {Observable} from "rxjs";
import {CustomerEntity} from "../entities/customer.entity";
import {VIEW_DETAIL_CUSTOMER} from "../../../../common/routes/users-management-service-routes";
import {RpcExceptionModel} from "../../../../weight-loss-consultant-authentication/src/app/filters/rpc-exception.model";
import {CampaignMapper} from "../mappers/campaign.mapper";
import {CampaignRepository} from "../repositories/campaign.repository";
import {CampaignEntity} from "../entities/campaign.entity";
import {CreateCampaignDto} from "../dtos/campaign/create-campaign";
import {UpdateCampaignDto} from "../dtos/campaign/update-campaign";
import {USERS_MANAGEMENT_SERVICE_NAME} from "../../../../../constant";

@Injectable()
export class CampaignService {
  constructor(
    private readonly repository: CampaignRepository,
    private readonly campaignMapper: CampaignMapper,
    @Inject(USERS_MANAGEMENT_SERVICE_NAME)
    private readonly usersManagementServiceProxy : ClientProxy,
  ) {
  }

  async findAll(): Promise<CampaignEntity[] | null> {
    return await this.repository.find();
  }

  private validateCustomer (email: string) : Observable<CustomerEntity> {
    return this.usersManagementServiceProxy.
    send<CustomerEntity, string>({VIEW_DETAIL_CUSTOMER}, email);
  }

  async create(dto: CreateCampaignDto): Promise<CampaignEntity> {
    const custEmail = dto.customerEmail;
    const findCust = await this.validateCustomer(custEmail).toPromise();
    if (findCust === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found customer with email: ${custEmail}`
      } as RpcExceptionModel);
    }
    const entity: CampaignEntity = await CampaignMapper.mapCreateCampaignDtoToEntity(dto, findCust);
    return await this.repository.save(entity);
  }

  async edit(dto: UpdateCampaignDto, id: number): Promise<UpdateResult> {

    if (id != dto.id) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param id: ${id} must match with id in request body: ${dto.id}`
      } as RpcExceptionModel);
    }
    const customerEmail = dto.customerEmail;
    const cust = await this.validateCustomer(customerEmail).toPromise();
    if (cust === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found customer with email: ${customerEmail}`
      } as RpcExceptionModel);
    }
    const existeCampaign = await this.viewDetail(dto.id);
    if (!existeCampaign) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found campaign with id: ${id}`
      } as RpcExceptionModel);
    }
    const entity: CampaignEntity = await CampaignMapper.mapUpdateCampaignDtoToEntity(dto, cust);
    return await this.repository.update(id, entity);

  }

  async delete(id): Promise<DeleteResult> {
    const existeCampaign = await this.viewDetail(id);
    if (!existeCampaign) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found campaign with id: ${id}`
      } as RpcExceptionModel);
    }
    return await this.repository.delete(id);
  }

  async viewDetail(id): Promise<CampaignEntity> {
    const result = await this.repository.createQueryBuilder("campaign")
      .where("campaign.id = :id", {id: id})
      .getOne();
    if (!result) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found campaign with id: ${id}`
      } as RpcExceptionModel);
    }
    return result
  }

  async getCampaignDetailsWithCustomer(): Promise<CampaignEntity[] | null> {
    return await this.repository.find({relations: ["customer"]})
  }

  async getAvailCampaigns() : Promise<CampaignEntity[]> {
    return this.repository.createQueryBuilder("campaign")
      .leftJoinAndSelect("campaign.customer", "customer")
      .where("campaign.status = :status", {status : 1})
      .getMany();
  }
}
