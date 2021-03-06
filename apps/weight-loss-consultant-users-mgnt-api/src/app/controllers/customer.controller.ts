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

  @MessagePattern({ cmd: VIEW_DETAIL_SPECIAL })
  @UseFilters(new ExceptionFilter())
  async getSpecial(@Payload() email: string) : Promise<any>{
    return this.customerService.viewOnlyCampaignsOfCustomer(email);
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

  @MessagePattern({ cmd: UPDATE_CUSTOMER_WITHOUT_PASSWORD_AND_STATUS })
  @UseFilters(new ExceptionFilter())
  async updateAdmninWithoutPasswordAndStatus(@Payload() payload: UpdateAdminPayload): Promise<UpdateResult> {
    return this.customerService.updateProfileWithoutPasswordAndStatus(payload);
  }

}
