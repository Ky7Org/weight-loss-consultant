import { Inject, Injectable } from '@nestjs/common';
import { USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';
import { AdminEntity } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/entities/admin.entity';
import {
  CREATE_ADMIN,
  DELETE_ADMIN,
  GET_ADMIN_BY_EMAIL,
  GET_ALL_ADMINS,
  UPDATE_ADMIN
} from '../../../../common/routes/users-management-service-routes';
import { UpdateAdminDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/admin/update-admin.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateAdminDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/admin/create-admin.dto';

@Injectable()
export class AdminService {

  constructor(
    @Inject(USERS_MANAGEMENT_SERVICE_NAME)
    private readonly usersManagementService: ClientProxy,
  ) {}

  async getAllAdmins(): Promise<AdminEntity[]> {
    const pattern = { cmd: GET_ALL_ADMINS };
    const payload = {};
    return this.usersManagementService.send(pattern, payload)
      .toPromise<AdminEntity[]>();
  }

  async getByEmail(email: string): Promise<AdminEntity> {
    const pattern = { cmd: GET_ADMIN_BY_EMAIL };
    const payload = email;
    return this.usersManagementService.send(pattern, payload)
      .toPromise<AdminEntity>();
  }

  async update(email: string, dto: UpdateAdminDto): Promise<UpdateResult> {
    const pattern = { cmd: UPDATE_ADMIN };
    const payload = {email, dto};
    return this.usersManagementService.send(pattern, payload)
      .toPromise<UpdateResult>();
  }

  async delete(email: string): Promise<DeleteResult> {
    const pattern = {cmd: DELETE_ADMIN };
    const payload = email;
    return this.usersManagementService.send(pattern, payload)
      .toPromise<DeleteResult>();
  }

  async create(dto: CreateAdminDto): Promise<AdminEntity> {
    const pattern = {cmd: CREATE_ADMIN }
    const payload = dto;
    return this.usersManagementService.send(pattern, payload)
      .toPromise<AdminEntity>();
  }
}

