import {HttpStatus, Inject, Injectable} from '@nestjs/common';
import {DeleteResult, UpdateResult} from 'typeorm';
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {Observable} from "rxjs";
import {CustomerEntity} from "../entities/customer.entity";
import {CUSTOMER_VIEW_DETAIL} from "../../../../common/routes/users-management-service-routes";
import {CampaignMapper} from "../mappers/campaign.mapper";
import {CampaignRepository} from "../repositories/campaign.repository";
import {CampaignEntity} from "../entities/campaign.entity";
import {CreateCampaignDto} from "../dtos/campaign/create-campaign";
import {UpdateCampaignDto} from "../dtos/campaign/update-campaign";
import {USERS_MANAGEMENT_SERVICE_NAME} from "../../../../../constant";
import {RpcExceptionModel} from "../../../../common/filters/rpc-exception.model";
import {UpdateStatusCampaignPayload} from "../../../../common/dtos/update-campaign-dto.payload";

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

  private validateCustomer(username: string): Observable<CustomerEntity> {
    return this.usersManagementServiceProxy
      .send<CustomerEntity, string>({ cmd: CUSTOMER_VIEW_DETAIL }, username);
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
    entity.status = 0;
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
      .leftJoinAndSelect("campaign.customer", "customer")
      .where("campaign.id = :id", {id: id})
      .getOne();
    return result
  }

  async getCampaignDetailsWithCustomer(): Promise<CampaignEntity[] | null> {
    return await this.repository.createQueryBuilder("campaign")
      .leftJoinAndSelect("campaign.customer", "customer")
      .orderBy("campaign.createDate" , "DESC")
      .getMany();
  }

  async getAvailCampaigns() : Promise<CampaignEntity[]> {
    return this.repository.createQueryBuilder("campaign")
      .leftJoinAndSelect("campaign.customer", "customer")
      .where("campaign.status = :status", {status : 0})
      .orderBy("campaign.createDate" , "DESC")
      .getMany();
  }

  async updateStatus(payload: UpdateStatusCampaignPayload) : Promise<boolean>  {
    const exist : CampaignEntity = await this.viewDetail(payload.id);
    if (!exist){
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found campaign with id: ${payload.id}`
      } as RpcExceptionModel);
    }
    const result = this.repository.createQueryBuilder()
      .update(CampaignEntity)
      .set({
        status: payload.status
      })
      .where("id = :id", {id: payload.id})
      .execute();
    if ((await result).affected === 1) {
      return true;
    }
    return false;
  }
}
