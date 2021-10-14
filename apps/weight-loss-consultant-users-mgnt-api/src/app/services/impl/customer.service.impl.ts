import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../repositories/customer.repository';
import { CustomerEntity } from '../../entities/customer.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateCustDto } from '../../dtos/customer/create-customer.dto';
import { UpdateCustomerPayload } from '../../controllers/customer.controller';
import { RedisCacheService } from '../redis-cache.service';
import { CUSTOMER_SERVICE_FIND_ALL_KEY, CUSTOMER_SERVICE_VIEW_DETAIL_KEY } from '../../../../../common/redis-routes';
import { CustomerMapper } from '../../../../../common/mappers/customer.mapper';
import { BaseService } from '../../../../../common/services/base.service';
import { EMAIL_EXISTED_ERR } from '../../../../../common/constants/validation-err-message';
import { constructGrpcException } from '../../../../../common/utils';

@Injectable()
export class CustomerService extends BaseService<CustomerEntity, CustomerRepository> {
  constructor(repository: CustomerRepository,
              private readonly redisCacheService: RedisCacheService) {
    super(repository);
  }

  async findAll(): Promise<CustomerEntity[]> {
    let result = await this.redisCacheService.get<CustomerEntity[]>(CUSTOMER_SERVICE_FIND_ALL_KEY);
    if (result === null) {
      result = await this.repository.find({
        relations: ['campaigns']
      });
      if (result !== undefined) {
        await this.redisCacheService.set<CustomerEntity[]>(CUSTOMER_SERVICE_FIND_ALL_KEY, result);
      } else {
        result = [];
      }
    }
    return result;
  }

  async create(dto: CreateCustDto): Promise<CustomerEntity> {
    const entity = await CustomerMapper.mapCreateCustDtoToEntity(dto);
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail) {
      throw constructGrpcException(HttpStatus.CONFLICT, EMAIL_EXISTED_ERR);
    }
    await this.redisCacheService.del(CUSTOMER_SERVICE_FIND_ALL_KEY);
    return this.repository.save(entity);
  }

  async edit(payload: UpdateCustomerPayload): Promise<UpdateResult> {
    const entity = await CustomerMapper.mapUpdateCustDtoToEntity(payload.dto);
    const email = payload.email;
    if (email !== entity.email) {
      throw constructGrpcException(HttpStatus.CONFLICT,
        `Param: ${email} must match with ${entity.email} in request body`);
    }
    const customer = await this.repository.createQueryBuilder('customer')
      .where('customer.phone = :phone', { phone: entity.phone })
      .getOne();
    if (customer) {
      throw constructGrpcException(HttpStatus.CONFLICT,
        `The phone number has already existed. Please choose another one.`);
    }
    const customerPhone = await this.repository.createQueryBuilder("customer")
      .where("customer.phone = :phone", {phone : entity.phone})
      .getOne();
    if (customerPhone) {
      throw constructGrpcException(HttpStatus.CONFLICT,
        `The phone number has been already registered, please choose another one.`);
    }
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail === undefined) {
      throw constructGrpcException(HttpStatus.NOT_FOUND,
        `Not found customer with email : ${entity.email}`);
    }
    await this.redisCacheService.del(CUSTOMER_SERVICE_FIND_ALL_KEY);
    return this.repository.update(entity.email, entity);
  }

  async delete(id): Promise<DeleteResult> {
    if (id === null || id === undefined) {
      throw constructGrpcException(HttpStatus.NOT_FOUND,
        `The customer isn't found with the provided email.`);
    }
    const existedCustomer = await this.repository.findOne(id);
    if (existedCustomer === undefined) {
      throw constructGrpcException(HttpStatus.NOT_FOUND,
        `Not found customer with email: ${id}`);
    }
    await this.redisCacheService.del(`${CUSTOMER_SERVICE_VIEW_DETAIL_KEY}${id}`);
    return this.repository.delete(id);
  }

  async findOneCustomer(id): Promise<CustomerEntity> {
    if (id === null || id === undefined) {
      throw constructGrpcException(HttpStatus.NOT_FOUND,
        `The customer isn't found with the provided email.`);
    }
    let result = await this.redisCacheService.get<CustomerEntity>(`${CUSTOMER_SERVICE_VIEW_DETAIL_KEY}${id}`);
    if (result === null) {
      result = await this.repository.findOne(id);
      if (result !== undefined) {
        await this.redisCacheService.set<CustomerEntity>(`${CUSTOMER_SERVICE_VIEW_DETAIL_KEY}${id}`, result);
      } else {
        result = {} as CustomerEntity;
      }
    }
    return result;
  }

  async viewDetail(id): Promise<CustomerEntity> {
    if (id === null || id === undefined) {
      throw constructGrpcException(HttpStatus.NOT_FOUND,
        `The customer isn't found with the provided email.`);
    }
    const result = this.repository.findOne({
      relations: ['campaigns'],
      where: [{
        email: `${id}`
      }]
    });
    if (result === undefined) {
      throw constructGrpcException(HttpStatus.NOT_FOUND,
        `Not found customer with email: ${id}`);
    }
    return result;
  }

}
