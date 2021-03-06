import { Inject, Injectable } from '@nestjs/common';
import { USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  GET_ALL_CUSTOMER, UPDATE_ADMIN_WITHOUT_PASSWORD_AND_STATUS,
  UPDATE_CUSTOMER, UPDATE_CUSTOMER_WITHOUT_PASSWORD_AND_STATUS,
  VIEW_DETAIL_CUSTOMER, VIEW_DETAIL_SPECIAL
} from '../../../../common/routes/users-management-service-routes';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { UpdateCustDto } from '../dtos/customer/update-customer-dto';
import { CreateCustDto } from '../dtos/customer/create-customer.dto';
import {UpdateAdminPayload} from "../../../../common/dtos/update-without-password-and-status.payload";

@Injectable()
export class CustomerService {

  constructor(@Inject(USERS_MANAGEMENT_SERVICE_NAME) private readonly usersManagementService: ClientProxy) {}

  async findAll(): Promise<CustomerEntity[]> {
    const pattern = {cmd: GET_ALL_CUSTOMER};
    const payload = {};
    // return this.usersManagementService.send(pattern, payload).toPromise<CustomerEntity[]>();
    return this.usersManagementService.send(pattern, payload).toPromise();
  }

  async viewDetail(email: string): Promise<CustomerEntity> {
    const pattern = {cmd: VIEW_DETAIL_CUSTOMER};
    const payload = email;
    // return this.usersManagementService.send(pattern, payload).toPromise<CustomerEntity>();
    return this.usersManagementService.send(pattern, payload).toPromise();
  }

  async viewDetailSpecial(email: string) : Promise<any>{
    const pattern = {cmd: VIEW_DETAIL_SPECIAL}
    const payload = email;
    return this.usersManagementService.send(pattern, payload).toPromise();
  }


  async delete(email): Promise<DeleteResult> {
    const pattern = {cmd: DELETE_CUSTOMER };
    const payload = email;
    // return this.usersManagementService.send(pattern, payload).toPromise<DeleteResult>();
    return this.usersManagementService.send(pattern, payload).toPromise();
  }

  async edit(email: string, dto: UpdateCustDto): Promise<UpdateResult> {
    const pattern = {cmd: UPDATE_CUSTOMER };
    const payload = {email, dto};
    // return this.usersManagementService.send(pattern, payload).toPromise<UpdateResult>();
    return this.usersManagementService.send(pattern, payload).toPromise();
  }

  async create(dto: CreateCustDto): Promise<CustomerEntity> {
    const pattern = {cmd: CREATE_CUSTOMER };
    const payload = dto;
    // return this.usersManagementService.send(pattern, payload).toPromise<CustomerEntity>();
    return this.usersManagementService.send(pattern, payload).toPromise();
  }

  async updateWithoutPasswordAndStatus(payload: UpdateAdminPayload) : Promise<UpdateResult> {
    const pattern = {cmd :  UPDATE_CUSTOMER_WITHOUT_PASSWORD_AND_STATUS};
    return this.usersManagementService.send(pattern, payload)
      .toPromise();
  }
}
