import { ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HealthInfoService } from '../services/impls/health.service';
import { UpdateHealthInfoPayloadType } from '../../../../common/routes/health-info-management-routes';
import { CreateHealthInfoDto } from '../dtos/heath-info/create-health-info.dto';
import { KAFKA_HEALTH_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';
import { IKafkaMessage } from '../../../../common/kafka-message.model';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class HealthCheckController {

  constructor(private readonly healthService: HealthInfoService) {
  }

  @MessagePattern(MESSAGE_PATTERN.getAll)
  @UseFilters(new ExceptionFilter())
  async index() {
    return this.healthService.getHealthInfoDetailsWithCustomer();
  }

  @MessagePattern(MESSAGE_PATTERN.getByID)
  @UseFilters(new ExceptionFilter())
  async getByID(@Payload() payload: IKafkaMessage<string>) {
    return this.healthService.viewDetail(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.create)
  @UseFilters(new ExceptionFilter())
  async create(@Payload() payload: IKafkaMessage<CreateHealthInfoDto>) {
    return this.healthService.create(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.update)
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: IKafkaMessage<UpdateHealthInfoPayloadType>) {
    return this.healthService.edit(payload.value.dto, payload.value.id);
  }

  @MessagePattern(MESSAGE_PATTERN.delete)
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() payload: IKafkaMessage<number>) {
    return this.healthService.del(payload.value);
  }
}
