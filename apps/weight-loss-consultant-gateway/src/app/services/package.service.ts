import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';
import { PackageEntity } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/entities/package.enttiy';
import { CreatePackageDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/package/create-package';
import { UpdatePackageDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/package/update-package';

import {
  CREATE_PACKAGE,
  DELETE_PACKAGE_BY_ID,
  FIND_ALL_PACKAGES,
  FIND_PACKAGE_BY_ID,
  UPDATE_PACKAGE_BY_ID, UpdatePackagePayloadType
} from '../../../../packages-management-routes';

@Injectable()
export class PackageService {

  constructor(@Inject(USERS_MANAGEMENT_SERVICE_NAME)
                private readonly usersManagementServiceProxy: ClientProxy) {
  }

  async delete(id: number): Promise<DeleteResult> {
      return this.usersManagementServiceProxy
        .send<DeleteResult, number>({cmd: DELETE_PACKAGE_BY_ID}, id)
        .toPromise();
  }

  async getPackageDetailsWithTrainer(): Promise<PackageEntity[]> {
    return this.usersManagementServiceProxy
      .send<PackageEntity[], void>({cmd: FIND_ALL_PACKAGES}, null)
      .toPromise();
  }

  async viewDetail(id: number): Promise<PackageEntity> {
    return this.usersManagementServiceProxy
      .send<PackageEntity, number>({cmd: FIND_PACKAGE_BY_ID}, id)
      .toPromise();
  }

  async create(dto: CreatePackageDto): Promise<PackageEntity> {
    return this.usersManagementServiceProxy
      .send<PackageEntity, CreatePackageDto>({cmd: CREATE_PACKAGE}, dto)
      .toPromise();
  }

  async edit(dto: UpdatePackageDto, id: number): Promise<void> {
    return this.usersManagementServiceProxy
      .send<void, UpdatePackagePayloadType>
      ({cmd: UPDATE_PACKAGE_BY_ID}, {dto: dto, id: id})
      .toPromise();
  }
}
