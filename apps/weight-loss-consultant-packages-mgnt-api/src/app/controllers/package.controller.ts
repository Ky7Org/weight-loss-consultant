import { ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { PackageService } from '../services/impls/package.service.impl';
import { CreatePackageDto } from '../dtos/package/create-package';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateStatusPackagePayload } from '../../../../common/dtos/update-package-dto.payload';
import { KAFKA_PACKAGES_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';
import { IKafkaMessage } from '../../../../common/kafka-message.model';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class PackageController {

  constructor(private readonly packageService: PackageService) {
  }

  @MessagePattern(MESSAGE_PATTERN.getAll)
  @UseFilters(new ExceptionFilter())
  async index() {
    return this.packageService.getPackageDetailsWithTrainer();
  }

  @MessagePattern(MESSAGE_PATTERN.getByID)
  @UseFilters(new ExceptionFilter())
  async getByID(@Payload() payload: IKafkaMessage<string>) {
    return this.packageService.viewDetail(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.create)
  @UseFilters(new ExceptionFilter())
  async create(@Payload() payload: IKafkaMessage<CreatePackageDto>) {
    return this.packageService.create(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.update)
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload) {
    return this.packageService.edit(payload.value.dto, payload.value.id);
  }

  @MessagePattern(MESSAGE_PATTERN.delete)
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() payload: IKafkaMessage<number>) {
    return this.packageService.delete(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.updateStatus)
  @UseFilters(new ExceptionFilter())
  async updateStatus(@Payload() payload: IKafkaMessage<UpdateStatusPackagePayload>) {
    return this.packageService.updateStatus(payload.value);
  }
}
