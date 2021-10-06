import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { PACKAGES_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';
import { PackageEntity } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/entities/package.enttiy';
import { CreatePackageDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/package/create-package';
import { UpdatePackageDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/package/update-package';

import {
  CREATE_PACKAGE,
  DELETE_PACKAGE_BY_ID,
  FIND_ALL_PACKAGES,
  FIND_PACKAGE_BY_ID,
  UPDATE_PACKAGE_BY_ID,
  UpdatePackagePayloadType
} from '../../../../packages-management-routes';

@Injectable()
export class PackageService {

  constructor(@Inject(PACKAGES_MANAGEMENT_SERVICE_NAME)
                private readonly packagesManagementProxy: ClientProxy) {
  }

  async delete(id: number): Promise<DeleteResult> {
      return this.packagesManagementProxy
        .send<DeleteResult, number>({cmd: DELETE_PACKAGE_BY_ID}, id)
        .toPromise();
  }

  async getPackageDetailsWithTrainer(): Promise<PackageEntity[]> {
    return this.packagesManagementProxy
      .send<PackageEntity[], Record<string, unknown>>({cmd: FIND_ALL_PACKAGES}, {})
      .toPromise();
  }

  async viewDetail(id: number): Promise<PackageEntity> {
    return this.packagesManagementProxy
      .send<PackageEntity, number>({cmd: FIND_PACKAGE_BY_ID}, id)
      .toPromise();
  }

  async create(dto: CreatePackageDto): Promise<PackageEntity> {
    return this.packagesManagementProxy
      .send<PackageEntity, CreatePackageDto>({cmd: CREATE_PACKAGE}, dto)
      .toPromise();
  }

  async edit(dto: UpdatePackageDto, id: number): Promise<void> {
    return this.packagesManagementProxy
      .send<void, UpdatePackagePayloadType>
      ({cmd: UPDATE_PACKAGE_BY_ID}, {dto: dto, id: id})
      .toPromise();
  }
}
