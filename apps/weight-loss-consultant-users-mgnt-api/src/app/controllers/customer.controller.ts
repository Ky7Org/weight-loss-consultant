import { Controller, UseFilters } from '@nestjs/common';
import { CustomerService } from '../services/impl/customer.service.impl';
import { CreateCustDto } from '../dtos/customer/create-customer.dto';
import { UpdateCustDto } from '../dtos/customer/update-customer-dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import {KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN} from "../../../../common/kafka-utils";

export type UpdateCustomerPayload = {
  email: string;
  dto: UpdateCustDto;
}

@Controller()
export class CustomerController {

  constructor(private readonly customerService: CustomerService) {
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.customers.getAllCustomers)
  @UseFilters(new ExceptionFilter())
  index(): Promise<CustomerEntity[]> {
    return this.customerService.findAll();
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.customers.getByEmail)
  @UseFilters(new ExceptionFilter())
  getByEmail(@Payload() email: string): Promise<CustomerEntity> {
    return this.customerService.viewDetail(email);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.customers.getSpecial)
  @UseFilters(new ExceptionFilter())
  getSpecial(@Payload() email: string) {
    return this.customerService.viewOnlyCampaignsOfCustomer(email);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.customers.create)
  @UseFilters(new ExceptionFilter())
  create(@Payload() dto: CreateCustDto): Promise<CustomerEntity> {
    return this.customerService.create(dto);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.customers.update)
  @UseFilters(new ExceptionFilter())
  update(@Payload() payload: UpdateCustomerPayload): Promise<UpdateResult> {
    return this.customerService.edit(payload);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.customers.delete)
  @UseFilters(new ExceptionFilter())
  delete(@Payload() email): Promise<DeleteResult> {
    return this.customerService.delete(email);
  }

}
