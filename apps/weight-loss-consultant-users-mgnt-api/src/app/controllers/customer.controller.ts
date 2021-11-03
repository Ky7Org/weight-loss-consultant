import { Controller, UseFilters } from '@nestjs/common';
import { CustomerService } from '../services/impl/customer.service.impl';
import { CreateCustDto } from '../dtos/customer/create-customer.dto';
import { UpdateCustDto } from '../dtos/customer/update-customer-dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  GET_ALL_CUSTOMER, UPDATE_ADMIN_WITHOUT_PASSWORD_AND_STATUS,
  UPDATE_CUSTOMER, UPDATE_CUSTOMER_WITHOUT_PASSWORD_AND_STATUS,
  VIEW_DETAIL_CUSTOMER, VIEW_DETAIL_SPECIAL
} from '../../../../common/routes/users-management-service-routes';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import {UpdateAdminPayload} from "../../../../common/dtos/update-without-password-and-status.payload";
import {KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN} from "../../../../common/kafka-utils";
import {IKafkaMessage} from "../../../../common/kafka-message.model";

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
  getByEmail(@Payload() email: IKafkaMessage<string>): Promise<CustomerEntity> {
    return this.customerService.viewDetail(email.value);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.customers.getSpecial)
  @UseFilters(new ExceptionFilter())
  getSpecial(@Payload() email: IKafkaMessage<string>) {
    return this.customerService.viewOnlyCampaignsOfCustomer(email.value);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.customers.create)
  @UseFilters(new ExceptionFilter())
  create(@Payload() dto: IKafkaMessage<CreateCustDto>): Promise<CustomerEntity> {
    return this.customerService.create(dto.value);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.customers.update)
  @UseFilters(new ExceptionFilter())
  update(@Payload() payload: IKafkaMessage<UpdateCustomerPayload>): Promise<UpdateResult> {
    return this.customerService.edit(payload.value);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.customers.delete)
  @UseFilters(new ExceptionFilter())
  delete(@Payload() email: IKafkaMessage<string>): Promise<DeleteResult> {
    return this.customerService.delete(email.value);
  }

  @MessagePattern({ cmd: UPDATE_CUSTOMER_WITHOUT_PASSWORD_AND_STATUS })
  @UseFilters(new ExceptionFilter())
  async updateAdmninWithoutPasswordAndStatus(@Payload() payload: UpdateAdminPayload): Promise<UpdateResult> {
    return this.customerService.updateProfileWithoutPasswordAndStatus(payload);
  }

}
