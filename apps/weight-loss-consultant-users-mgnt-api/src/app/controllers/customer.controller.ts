import { Controller } from '@nestjs/common';
import { CustomerService } from '../services/impl/customer.service.impl';
import { CreateCustDto } from '../dtos/customer/create-customer.dto';
import { UpdateCustDto } from '../dtos/customer/update-customer-dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  GET_ALL_CUSTOMER,
  UPDATE_CUSTOMER,
  VIEW_DETAIL_CUSTOMER
} from '../../../../users-management-service-routes';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';

@Controller()
export class CustomerController {

  constructor(private readonly customerService: CustomerService) {
  }

  @MessagePattern({ cmd: GET_ALL_CUSTOMER })
  async index(): Promise<CustomerEntity[]> {
    try {
      return  this.customerService.findAll();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  @MessagePattern({ cmd: VIEW_DETAIL_CUSTOMER})
  async getByEmail(@Payload() email: string): Promise<CustomerEntity> {
    try {
      return this.customerService.viewDetail(email);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  @MessagePattern({ cmd: CREATE_CUSTOMER })
  async create(@Payload() dto: CreateCustDto): Promise<CustomerEntity> {
    try {
      return this.customerService.create(dto);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  @MessagePattern({ cmd: UPDATE_CUSTOMER})
  async update(@Payload() payload: {
    email: string;
    dto: UpdateCustDto;
  }): Promise<UpdateResult> {
    try {
      return this.customerService.edit(payload.dto);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  @MessagePattern({cmd: DELETE_CUSTOMER})
  async delete(@Payload() email): Promise<DeleteResult> {
    try {
      return this.customerService.delete(email);
    } catch (e) {
      return Promise.reject(e);
    }
  }

}
