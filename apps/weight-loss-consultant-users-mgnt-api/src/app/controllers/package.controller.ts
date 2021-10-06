import { Controller } from '@nestjs/common';
import { CreatePackageDto } from '../dtos/package/create-package';
import { PackageService } from '../services/impl/package.service.impl';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CREATE_PACKAGE,
  DELETE_PACKAGE_BY_ID,
  FIND_ALL_PACKAGES,
  FIND_PACKAGE_BY_ID,
  UPDATE_PACKAGE_BY_ID,
  UpdatePackagePayloadType
} from '../../../../packages-management-routes';


@Controller('/v1/packages')
export class PackageController {

  constructor(private readonly packageService: PackageService) {
  }

 // @Roles(Role.Trainer)
  @MessagePattern({cmd: FIND_ALL_PACKAGES})
  async index() {
    return this.packageService.getPackageDetailsWithTrainer();
  }

  //@Roles(Role.Trainer, Role.Customer)
  @MessagePattern({cmd: FIND_PACKAGE_BY_ID})
  async getByID(@Payload() id: number) {
    return this.packageService.viewDetail(id);
  }

  //@Roles(Role.Trainer)
  @MessagePattern({cmd: CREATE_PACKAGE})
  async create(@Payload() payload: CreatePackageDto) {
    return this.packageService.create(payload);
  }

 // @Roles(Role.Trainer)
  @MessagePattern({cmd: UPDATE_PACKAGE_BY_ID})
  async update(@Payload() payload: UpdatePackagePayloadType) {
    return this.packageService.edit(payload.dto, payload.id);
  }

  //@Roles(Role.Trainer)
  @MessagePattern({cmd: DELETE_PACKAGE_BY_ID})
  async delete(@Payload() id: number) {
    return this.packageService.delete(id);
  }
}
