import { HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HeathInfoEntity } from '../../entities/health-info.entity';
import { BaseService } from '../base.service';
import { HealthRepository } from '../../repositories/health-info.repository';
import { HealthInfoMapper } from '../../mappers/health-info.mapper';
import { CustomerService } from './customer.service.impl';
import { CreateHealthInfoDto } from '../../dtos/heath-info/create-health-info.dto';
import { UpdateHealthInfoDto } from '../../dtos/heath-info/update-health-info.dto';
import { RpcException } from '@nestjs/microservices';
import { RpcExceptionModel } from '../../../../../common/filters/rpc-exception.model';

@Injectable()
export class HealthInfoService extends BaseService<HeathInfoEntity, HealthRepository> {
  constructor(repository: HealthRepository,
              private customerService: CustomerService) {
    super(repository);
  }

  async findAll(): Promise<HeathInfoEntity[] | null> {
    return this.repository.find();
  }

  async create(dto: CreateHealthInfoDto): Promise<HeathInfoEntity | null> {
    const custEmail = dto.customerEmail;
    const findCust = await this.customerService.findById(custEmail);
    if (findCust === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found customer email : ${dto.customerEmail}`
      } as RpcExceptionModel);
    }
    const entity: HeathInfoEntity = await HealthInfoMapper.mapCreateHealthDtoToEntity(dto, findCust);
    return this.repository.save(entity);
  }

  async edit(dto: UpdateHealthInfoDto, id: number): Promise<UpdateResult> {
    if (id != dto.id) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param id: ${id} must match with id in request body: ${dto.id}`
      } as RpcExceptionModel);
    }
    const customerEmail = dto.customerEmail;
    const cust = await this.customerService.findById(customerEmail);
    if (cust === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found customer with email: ${customerEmail}`
      } as RpcExceptionModel);
    }
    const existHealthInfo = await this.viewDetail(dto.id);
    if (!existHealthInfo) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found health info with id: ${id}`
      } as RpcExceptionModel);
    }
    const entity: HeathInfoEntity = await HealthInfoMapper.mapUpdateHealthDtoToEntity(dto, cust);
    return this.repository.update(id, entity);

  }

  async del(id): Promise<DeleteResult> {
    const existHealthInfo = await this.viewDetail(id);
    if (!existHealthInfo) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found health info with id: ${id}`
      } as RpcExceptionModel);
    }
    return this.repository.delete(id);
  }

  async viewDetail(id): Promise<HeathInfoEntity> {
    return this.repository.createQueryBuilder("health")
      .where("health.id = :id", {id: id})
      .leftJoinAndSelect("health.customer", "campaign")
      .getOneOrFail().catch((err) => {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Not found health info with id: ${id}`
        } as RpcExceptionModel);
      })
  }

  async getHealthInfoDetailsWithCustomer(): Promise<HeathInfoEntity[] | null> {
    return this.repository.find({relations: ["customer"]});
  }
}
