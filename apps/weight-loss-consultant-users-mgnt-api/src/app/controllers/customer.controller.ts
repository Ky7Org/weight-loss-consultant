import { Controller, UseFilters } from '@nestjs/common';
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
} from '../../../../common/routes/users-management-service-routes';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';

export type UpdateCustomerPayload = {
  email: string;
  dto: UpdateCustDto;
}

@Controller()
export class CustomerController {

  constructor(private readonly customerService: CustomerService) {
  }

  @MessagePattern({ cmd: GET_ALL_CUSTOMER })
  @UseFilters(new ExceptionFilter())
  async index(): Promise<CustomerEntity[]> {
    return this.customerService.findAll();
  }

  @MessagePattern({ cmd: VIEW_DETAIL_CUSTOMER })
  @UseFilters(new ExceptionFilter())
  async getByEmail(@Payload() email: string): Promise<CustomerEntity> {
    return this.customerService.viewDetail(email);
  }

  @MessagePattern({ cmd: CREATE_CUSTOMER })
  @UseFilters(new ExceptionFilter())
  async create(@Payload() dto: CreateCustDto): Promise<CustomerEntity> {
    return this.customerService.create(dto);
  }

  @MessagePattern({ cmd: UPDATE_CUSTOMER })
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: UpdateCustomerPayload): Promise<UpdateResult> {
    return this.customerService.edit(payload);
  }

  @MessagePattern({ cmd: DELETE_CUSTOMER })
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() email): Promise<DeleteResult> {
    return this.customerService.delete(email);
  }

}
