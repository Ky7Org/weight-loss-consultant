import { Inject, Injectable } from '@nestjs/common';
import { USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';
import {
  CREATE_ADMIN,
  DELETE_ADMIN,
  GET_ADMIN_BY_EMAIL,
  GET_ALL_ADMINS,
  UPDATE_ADMIN
} from '../../../../common/routes/users-management-service-routes';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { UpdateAdminDto } from '../dtos/admin/update-admin.dto';
import { CreateAdminDto } from '../dtos/admin/create-admin.dto';
import {PaginationDto} from "../dtos/pagination/pagination.dto";

@Injectable()
export class AdminService {

  private readonly usersManagementService: ClientProxy;

  async getAllAdmins(payload: PaginationDto): Promise<AdminEntity[]> {
    const pattern = { cmd: GET_ALL_ADMINS };
    // const payload = {};
    return this.usersManagementService.send(pattern, payload)
      // .toPromise<AdminEntity[]>();
      .toPromise();
  }

  async getByEmail(email: string): Promise<AdminEntity> {
    const pattern = { cmd: GET_ADMIN_BY_EMAIL };
    const payload = email;
    return this.usersManagementService.send(pattern, payload)
      // .toPromise<AdminEntity>();
      .toPromise();
  }

  async update(email: string, dto: UpdateAdminDto): Promise<UpdateResult> {
    const pattern = { cmd: UPDATE_ADMIN };
    const payload = {email, dto};
    return this.usersManagementService.send(pattern, payload)
      // .toPromise<UpdateResult>();
      .toPromise();
  }

  async delete(email: string): Promise<DeleteResult> {
    const pattern = {cmd: DELETE_ADMIN };
    const payload = email;
    return this.usersManagementService.send(pattern, payload)
      // .toPromise<DeleteResult>();
      .toPromise();
  }

  async create(dto: CreateAdminDto): Promise<AdminEntity> {
    const pattern = {cmd: CREATE_ADMIN }
    const payload = dto;
    return this.usersManagementService.send(pattern, payload)
      // .toPromise<AdminEntity>();
      .toPromise();
  }
}

