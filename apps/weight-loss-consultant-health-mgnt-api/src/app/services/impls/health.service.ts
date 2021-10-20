import {ConflictException, HttpStatus, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import {HeathInfoEntity} from "../../entities/health-info.entity";
import {HealthRepository} from "../../repositories/health-info.repository";
import {HealthInfoMapper} from "../../mappers/health-info.mapper";
import {CreateHealthInfoDto} from "../../dtos/heath-info/create-health-info.dto";
import {UpdateHealthInfoDto} from "../../dtos/heath-info/update-health-info.dto";
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {RpcExceptionModel} from "../../../../../common/filters/rpc-exception.model";
import {USERS_MANAGEMENT_SERVICE_NAME} from "../../../../../../constant";
import {Observable} from "rxjs";
import {CustomerEntity} from "../../entities/customer.entity";
import {CUSTOMER_VIEW_DETAIL} from "../../../../../common/routes/users-management-service-routes";

@Injectable()
export class HealthInfoService
{
  constructor(private readonly repository: HealthRepository,
              private mapper: HealthInfoMapper,
              @Inject(USERS_MANAGEMENT_SERVICE_NAME)
              private readonly usersManagementServiceProxy : ClientProxy
  ) {
  }

  private validateCustomer(email : string) : Observable<CustomerEntity> {
    return this.usersManagementServiceProxy
      .send<CustomerEntity, string>({cmd: CUSTOMER_VIEW_DETAIL}, email);
  }

  async findAll(): Promise<HeathInfoEntity[] | null> {
    return await this.repository.find();
  }

  async create(dto: CreateHealthInfoDto): Promise<HeathInfoEntity | null> {
    const custEmail = dto.customerEmail;
    const findCust = await this.validateCustomer(custEmail).toPromise();
    if (findCust === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found customer email : ${dto.customerEmail}`
      } as RpcExceptionModel);
    }
    const entity: HeathInfoEntity = await HealthInfoMapper.mapCreateHealthDtoToEntity(dto, findCust);
    return await this.repository.save(entity);
  }

  async edit(dto: UpdateHealthInfoDto, id: number): Promise<UpdateResult> {
    if (id != dto.id) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param id: ${id} must match with id in request body: ${dto.id}`
      } as RpcExceptionModel);
    }
    const custEmail = dto.customerEmail;
    const findCust = await this.validateCustomer(custEmail).toPromise();
    if (findCust === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found customer with email: ${custEmail}`
      } as RpcExceptionModel);
    }
    const existHealthInfo = await this.viewDetail(dto.id);
    if (!existHealthInfo) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found health info with id: ${id}`
      } as RpcExceptionModel);
    }
    const entity: HeathInfoEntity = await HealthInfoMapper.mapUpdateHealthDtoToEntity(dto, findCust);
    return await this.repository.update(id, entity);

  }

  async del(id): Promise<DeleteResult> {
    const existHealthInfo = await this.viewDetail(id);
    if (!existHealthInfo) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found health info with id: ${id}`
      } as RpcExceptionModel);
    }
    return await this.repository.delete(id);
  }

  async viewDetail(id): Promise<HeathInfoEntity> {
    const query = this.repository.createQueryBuilder("health")
      .where("health.id = :id", {id: id})
      .leftJoinAndSelect("health.customer", "campaign")
      .getOne();
    return query;
  }

  async getHealthInfoDetailsWithCustomer(): Promise<HeathInfoEntity[] | null> {
    return await this.repository.find({relations: ["customer"]})
  }
}
