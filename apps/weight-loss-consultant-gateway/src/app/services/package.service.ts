import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { PACKAGES_MANAGEMENT_SERVICE_NAME } from '../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';

import {
  CREATE_PACKAGE,
  DELETE_PACKAGE_BY_ID,
  FIND_ALL_PACKAGES,
  FIND_PACKAGE_BY_ID,
  UPDATE_PACKAGE_BY_ID,
} from '../../../../common/routes/packages-management-routes';
import { CreatePackageDto } from '../dtos/package/create-package';
import { PackageEntity } from '../entities/package.entity';
import {UpdatePackageDto} from "../dtos/package/update-package";

@Injectable()
export class PackageService {
  private readonly packagesManagementProxy;

  async delete(id: number): Promise<DeleteResult> {
      return this.packagesManagementProxy
        .send({cmd: DELETE_PACKAGE_BY_ID}, id)
        .toPromise();
  }

  async getPackageDetailsWithTrainer(): Promise<PackageEntity[]> {
    return this.packagesManagementProxy
      .send({cmd: FIND_ALL_PACKAGES}, {})
      .toPromise();
  }

  async viewDetail(id: number): Promise<PackageEntity> {
    return this.packagesManagementProxy
      .send({cmd: FIND_PACKAGE_BY_ID}, id)
      .toPromise();
  }

  async create(dto: CreatePackageDto): Promise<PackageEntity> {
    return this.packagesManagementProxy
      .send({cmd: CREATE_PACKAGE}, dto)
      .toPromise();
  }

  async edit(dto: UpdatePackageDto, id: number): Promise<void> {
    return this.packagesManagementProxy
      .send
      ({cmd: UPDATE_PACKAGE_BY_ID}, {dto: dto, id: id})
      .toPromise();
  }
}
