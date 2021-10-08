import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { CustomerRepository } from '../../repositories/customer.repository';
import { CustomerEntity } from '../../entities/customer.entity';
import { EMAIL_EXISTED_ERR } from '../../constants/validation-err-message';
import { DeleteResult, Like, UpdateResult } from 'typeorm';
import { CustomerMapper } from '../../mappers/customer.mapper';
import { CreateCustDto } from '../../dtos/customer/create-customer.dto';
import { UpdateCustDto } from '../../dtos/customer/update-customer-dto';
import { RpcException } from '@nestjs/microservices';
import { RpcExceptionModel } from '../../../../../common/filters/rpc-exception.model';
import {UpdateCustomerPayload} from "../../controllers/customer.controller";

@Injectable()
export class CustomerService extends BaseService<CustomerEntity, CustomerRepository> {
  constructor(repository: CustomerRepository, private customerMapper: CustomerMapper) {
    super(repository);
  }

  async findAll(): Promise<CustomerEntity[] | null> {
    return await this.repository.find({
      relations: ["campaigns"],
    });
  }

  async create(dto: CreateCustDto): Promise<CustomerEntity> {
    const entity: CustomerEntity = await CustomerMapper.mapCreateCustDtoToEntity(dto);
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: EMAIL_EXISTED_ERR
      } as RpcExceptionModel);
    }
    return this.repository.save<CustomerEntity>(entity);
  }

  async edit(payload: UpdateCustomerPayload): Promise<UpdateResult> {
    const entity: CustomerEntity = await CustomerMapper.mapUpdateCustDtoToEntity(payload.dto);
    const email = payload.email;
    if (email !== entity.email) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param: ${email} must match with ${entity.email} in request body`
      } as RpcExceptionModel);
    }
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found customer with email : ${entity.email}`
      } as RpcExceptionModel);
    }
    return this.repository.update(entity.email, entity);
  }

  async delete(id): Promise<DeleteResult> {
    const existedCustomer = await this.repository.findOne(id);
    if (existedCustomer === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found customer with email : ${id}`
      } as RpcExceptionModel);
    }
    return await this.repository.delete(id);
  }

  async findOneCustomer(id) : Promise<CustomerEntity> {
    return this.repository.findOne(id);
  }

  async viewDetail(id): Promise<CustomerEntity> {
    return this.repository.findOne({
      relations: ["campaigns"],
      where: [{
        email : `${id}`
      }]
    });
  }

  //testing
  async getAllCustomerWithCampaignDetail(): Promise<CustomerEntity[]> {
    const value = "c";
    const result = this.repository.find(
      {
        select: ["email", "dob"],
        where:{
          email: Like(`%${value}%`)
        },
        relations: ["campaigns"],
        order: {
          dob: "ASC",
          email: "DESC",
        }
      }
    );
    return result;
  }

}
