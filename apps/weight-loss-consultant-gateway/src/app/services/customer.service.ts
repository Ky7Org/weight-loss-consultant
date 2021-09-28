import {Inject, Injectable} from "@nestjs/common";
import {USERS_MANAGEMENT_SERVICE_NAME} from "../../../../../constant";
import {ClientProxy} from "@nestjs/microservices";
import {CustomerEntity} from "../../../../weight-loss-consultant-authentication/src/app/entities/customer.entity";
import {
  CREATE_CUSTOMER,
  DELETE_CUSTOMER,
  GET_ALL_CUSTOMER,
  UPDATE_CUSTOMER,
  VIEW_DETAIL_CUSTOMER
} from "../../../../users-management-service-routes";
import {DeleteResult, UpdateResult} from "typeorm";
import {UpdateCustDto} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/customer/update-customer-dto";
import {CreateCustDto} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/customer/create-customer.dto";

@Injectable()
export class CustomerService {

  constructor(@Inject(USERS_MANAGEMENT_SERVICE_NAME) private readonly usersManagementService: ClientProxy) {}

  async findAll(): Promise<CustomerEntity[]> {
    const pattern = {cmd: GET_ALL_CUSTOMER};
    const payload = {};
    return this.usersManagementService.send(pattern, payload).toPromise<CustomerEntity[]>();
  }

  async viewDetail(email: string): Promise<CustomerEntity> {
    const pattern = {cmd: VIEW_DETAIL_CUSTOMER};
    const payload = email;
    return this.usersManagementService.send(pattern, payload).toPromise<CustomerEntity>();
  }


  async delete(email): Promise<DeleteResult> {
    const pattern = {cmd: DELETE_CUSTOMER };
    const payload = email;
    return this.usersManagementService.send(pattern, payload).toPromise<DeleteResult>();
  }

  async edit(email: string, dto: UpdateCustDto): Promise<UpdateResult> {
    const pattern = {cmd: UPDATE_CUSTOMER };
    const payload = {email, dto};
    return this.usersManagementService.send(pattern, payload).toPromise<UpdateResult>();
  }

  async create(dto: CreateCustDto): Promise<CustomerEntity> {
    const pattern = {cmd: CREATE_CUSTOMER };
    const payload = dto;
    return this.usersManagementService.send(pattern, payload).toPromise<CustomerEntity>();
  }
}
