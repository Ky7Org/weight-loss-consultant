import { ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { CustomerService } from '../services/impl/customer.service.impl';
import { CreateCustDto } from '../dtos/customer/create-customer.dto';
import { UpdateCustDto } from '../dtos/customer/update-customer-dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import {UpdateAdminPayload} from "../../../../common/dtos/update-without-password-and-status.payload";
import {IKafkaMessage} from "../../../../common/kafka-message.model";
import {KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN} from "../../../../common/kafka-utils";

export type UpdateCustomerPayload = {
  email: string;
  dto: UpdateCustDto;
}

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class CustomerController {

  constructor(private readonly customerService: CustomerService) {
  }

  @MessagePattern(MESSAGE_PATTERN.customers.getAllCustomers)
  @UseFilters(new ExceptionFilter())
  index(): Promise<CustomerEntity[]> {
    return this.customerService.findAll();
  }

  @MessagePattern(MESSAGE_PATTERN.customers.getByEmail)
  @UseFilters(new ExceptionFilter())
  getByEmail(@Payload() email: IKafkaMessage<string>): Promise<CustomerEntity> {
    return this.customerService.viewDetail(email.value);
  }

  @MessagePattern(MESSAGE_PATTERN.customers.getSpecial)
  @UseFilters(new ExceptionFilter())
  getSpecial(@Payload() email: IKafkaMessage<string>) {
    return this.customerService.viewOnlyCampaignsOfCustomer(email.value);
  }

  @MessagePattern(MESSAGE_PATTERN.customers.create)
  @UseFilters(new ExceptionFilter())
  create(@Payload() dto: IKafkaMessage<CreateCustDto>): Promise<CustomerEntity> {
    return this.customerService.create(dto.value);
  }

  @MessagePattern(MESSAGE_PATTERN.customers.update)
  @UseFilters(new ExceptionFilter())
  update(@Payload() payload: IKafkaMessage<UpdateCustomerPayload>): Promise<UpdateResult> {
    return this.customerService.edit(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.customers.delete)
  @UseFilters(new ExceptionFilter())
  delete(@Payload() email: IKafkaMessage<string>): Promise<DeleteResult> {
    return this.customerService.delete(email.value);
  }

  @MessagePattern(MESSAGE_PATTERN.customers.updateProfileWithoutPasswordAndStatus)
  @UseFilters(new ExceptionFilter())
  async updateAdminWithoutPasswordAndStatus(@Payload() payload: IKafkaMessage<UpdateAdminPayload>): Promise<UpdateResult> {
    return this.customerService.updateProfileWithoutPasswordAndStatus(payload.value);
  }

}
