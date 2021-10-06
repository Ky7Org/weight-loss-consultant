import { Controller, UseFilters } from '@nestjs/common';
import { PackageService } from '../services/impls/package.service.impl';
import { CreatePackageDto } from '../dtos/package/create-package';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CREATE_PACKAGE,
  DELETE_PACKAGE_BY_ID,
  FIND_ALL_PACKAGES,
  FIND_PACKAGE_BY_ID,
  UPDATE_PACKAGE_BY_ID,
  UpdatePackagePayloadType
} from '../../../../common/routes/packages-management-routes';


@Controller()
export class PackageController {

  constructor(private readonly packageService: PackageService) {
  }

  @MessagePattern({ cmd: FIND_ALL_PACKAGES })
  @UseFilters(new ExceptionFilter())
  async index() {
    return this.packageService.getPackageDetailsWithTrainer();
  }

  @MessagePattern({ cmd: FIND_PACKAGE_BY_ID })
  @UseFilters(new ExceptionFilter())
  async getByID(@Payload() id: string) {
    return this.packageService.viewDetail(id);
  }

  @MessagePattern({ cmd: CREATE_PACKAGE })
  @UseFilters(new ExceptionFilter())
  async create(@Payload() dto: CreatePackageDto) {
    return this.packageService.create(dto);
  }

  @MessagePattern({ cmd: UPDATE_PACKAGE_BY_ID })
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: UpdatePackagePayloadType) {
    return this.packageService.edit(payload.dto, payload.id);
  }

  @MessagePattern({ cmd: DELETE_PACKAGE_BY_ID })
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() id: number) {
    return this.packageService.delete(id);
  }
}
