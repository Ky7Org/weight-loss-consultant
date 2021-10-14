import { Controller, UseFilters } from '@nestjs/common';
import { CustomerService } from '../services/impl/customer.service.impl';
import { CreateCustDto } from '../dtos/customer/create-customer.dto';
import { UpdateCustDto } from '../dtos/customer/update-customer-dto';
import { GrpcMethod } from '@nestjs/microservices';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import {
  CUSTOMER_SERVICE_DELETE,
  CUSTOMER_SERVICE_FIND_ALL,
  CUSTOMER_SERVICE_UPDATE,
  CUSTOMER_SERVICE_VIEW_DETAIL,
  GRPC_CUSTOMER_SERVICE
} from '../../../../common/grpc-services.route';
import { constructGRPCResponse } from '../../../../common/utils';
import { CustomerEntityViewDetailRequest } from '../../../../common/proto-models/users-mgnt.proto';

export type UpdateCustomerPayload = {
  email: string;
  dto: UpdateCustDto;
}

@Controller()
export class CustomerController {

  constructor(private readonly customerService: CustomerService) {
  }

  @GrpcMethod(GRPC_CUSTOMER_SERVICE, CUSTOMER_SERVICE_FIND_ALL)
  @UseFilters(new ExceptionFilter())
  index() {
    return constructGRPCResponse(this.customerService.findAll());
  }

  @GrpcMethod(GRPC_CUSTOMER_SERVICE, CUSTOMER_SERVICE_VIEW_DETAIL)
  @UseFilters(new ExceptionFilter())
  getByEmail(payload: CustomerEntityViewDetailRequest) {
    return constructGRPCResponse(this.customerService.viewDetail(payload.email));
  }

  @GrpcMethod(GRPC_CUSTOMER_SERVICE, CUSTOMER_SERVICE_VIEW_DETAIL)
  @UseFilters(new ExceptionFilter())
  async create(dto: CreateCustDto) {
    return constructGRPCResponse(this.customerService.create(dto));
  }

  @GrpcMethod(GRPC_CUSTOMER_SERVICE, CUSTOMER_SERVICE_UPDATE)
  @UseFilters(new ExceptionFilter())
  async update(payload: UpdateCustomerPayload) {
    return constructGRPCResponse(this.customerService.edit(payload));
  }

  @GrpcMethod(GRPC_CUSTOMER_SERVICE, CUSTOMER_SERVICE_DELETE)
  @UseFilters(new ExceptionFilter())
  async delete(email) {
    return constructGRPCResponse(this.customerService.delete(email));
  }

}
