import {ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors} from '@nestjs/common';
import {CustomerService} from '../services/impl/customer.service.impl';
import {CreateCustDto} from '../dtos/customer/create-customer.dto';
import {UpdateCustDto} from '../dtos/customer/update-customer-dto';
import {GrpcMethod, MessagePattern, Payload} from '@nestjs/microservices';
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER
} from '../../../../common/routes/users-management-service-routes';
import {DeleteResult, UpdateResult} from 'typeorm';
import {CustomerEntity} from '../entities/customer.entity';
import {ExceptionFilter} from '../../../../common/filters/rpc-exception.filter';
import {
  CUSTOMER_SERVICE_FIND_ALL,
  CUSTOMER_SERVICE_VIEW_DETAIL,
  GRPC_CUSTOMER_SERVICE
} from "../../../../common/grpc-services.route";
import {constructGRPCResponse} from "../../../../common/utils";
import {CustomerEntityViewDetailRequest} from "../../../../common/proto-models/users-mgnt.proto";

export type UpdateCustomerPayload = {
  email: string;
  dto: UpdateCustDto;
}

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
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
