import { HttpStatus, Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { CustomerEntity } from '../entities/customer.entity';
import { CUSTOMER_VIEW_DETAIL } from '../../../../common/routes/users-management-service-routes';
import { CampaignMapper } from '../mappers/campaign.mapper';
import { CampaignRepository } from '../repositories/campaign.repository';
import { CampaignEntity } from '../entities/campaign.entity';
import { CreateCampaignDto } from '../dtos/campaign/create-campaign';
import { UpdateCampaignDto } from '../dtos/campaign/update-campaign';
import { RpcExceptionModel } from '../../../../common/filters/rpc-exception.model';
import { UpdateStatusCampaignPayload } from '../../../../common/dtos/update-campaign-dto.payload';
import { KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';

@Injectable()
export class CampaignService implements OnModuleInit, OnModuleDestroy {

  @Inject('SERVER')
  private readonly usersManagementClient : ClientKafka;

  constructor(private readonly repository: CampaignRepository) {}

  async onModuleInit() {
    for (const [key, value] of Object.entries(MESSAGE_PATTERN)) {
      for (const [key2, value2] of Object.entries(value)) {
        this.usersManagementClient.subscribeToResponseOf(value2);
      }    }
    this.usersManagementClient.connect();
  }

  async onModuleDestroy() {
    await this.usersManagementClient.close();
  }

  async findAll(): Promise<CampaignEntity[] | null> {
    return this.repository.find();
  }

  private validateCustomer(username: string): Observable<CustomerEntity> {
    return this.usersManagementClient
      .send<CustomerEntity, string>({ cmd: CUSTOMER_VIEW_DETAIL }, username);
  }

  async create(dto: CreateCampaignDto): Promise<CampaignEntity> {
    const custEmail = dto.customerEmail;
    const findCust = await lastValueFrom(this.validateCustomer(custEmail));
    if (findCust === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found customer with email: ${custEmail}`
      } as RpcExceptionModel);
    }
    const entity: CampaignEntity = await CampaignMapper.mapCreateCampaignDtoToEntity(dto, findCust);
    entity.status = 0;
    return this.repository.save(entity);
  }

  async edit(dto: UpdateCampaignDto, id: number): Promise<UpdateResult> {
    if (id != dto.id) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param id: ${id} must match with id in request body: ${dto.id}`
      } as RpcExceptionModel);
    }
    const customerEmail = dto.customerEmail;
    const cust = await lastValueFrom(this.validateCustomer(customerEmail));
    if (cust === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found customer with email: ${customerEmail}`
      } as RpcExceptionModel);
    }
    const existedCampaign = await this.viewDetail(dto.id);
    if (!existedCampaign) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found campaign with id: ${id}`
      } as RpcExceptionModel);
    }
    const entity: CampaignEntity = await CampaignMapper.mapUpdateCampaignDtoToEntity(dto, cust);
    return this.repository.update(id, entity);

  }

  async delete(id): Promise<DeleteResult> {
    const existedCampaign = await this.viewDetail(id);
    if (!existedCampaign) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found campaign with id: ${id}`
      } as RpcExceptionModel);
    }
    return this.repository.delete(id);
  }

  async viewDetail(id): Promise<CampaignEntity> {
    return this.repository.createQueryBuilder("campaign")
      .leftJoinAndSelect("campaign.customer", "customer")
      .where("campaign.id = :id", {id: id})
      .getOneOrFail().catch((err) => {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Not found campaign with id: ${id}`
        } as RpcExceptionModel);
      });
  }

  async getCampaignDetailsWithCustomer(): Promise<CampaignEntity[] | null> {
    return this.repository.createQueryBuilder("campaign")
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
    return (await result).affected === 1;
  }
}
