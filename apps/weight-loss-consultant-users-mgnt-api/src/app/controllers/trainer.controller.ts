import { ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { TrainerService } from '../services/impl/trainer.service.impl';
import { CreateTrainerDto } from '../dtos/trainer/create-trainer';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import { UpdateTrainerPayloadType } from '../../../../common/dtos/update-trainer-dto.payload';
import {UpdateTrainerPayload} from "../../../../common/dtos/update-without-password-and-status.payload";
import {UpdateResult} from "typeorm";
import {KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN} from '../../../../common/kafka-utils'
import {IKafkaMessage} from "../../../../common/kafka-message.model";

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class TrainerController {

  constructor(private readonly trainerService: TrainerService) {
  }

  @MessagePattern(MESSAGE_PATTERN.trainers.getAllTrainers)
  @UseFilters(new ExceptionFilter())
  index() {
    return this.trainerService.findAll();
  }

  @MessagePattern(MESSAGE_PATTERN.trainers.getByEmail)
  @UseFilters(new ExceptionFilter())
  getByEmail(@Payload() email: IKafkaMessage<string>) {
    return this.trainerService.viewDetail(email.value);
  }

  @MessagePattern(MESSAGE_PATTERN.trainers.create)
  @UseFilters(new ExceptionFilter())
  create(@Payload() dto: IKafkaMessage<CreateTrainerDto>) {
    return this.trainerService.create(dto.value);
  }

  @MessagePattern(MESSAGE_PATTERN.trainers.update)
  @UseFilters(new ExceptionFilter())
  update(@Payload() payload: IKafkaMessage<UpdateTrainerPayloadType>) {
    return this.trainerService.edit(payload.value.dto, payload.value.email);
  }

  @MessagePattern(MESSAGE_PATTERN.trainers.delete)
  @UseFilters(new ExceptionFilter())
  delete(@Payload() email: IKafkaMessage<string>) {
    return this.trainerService.delete(email.value);
  }

  @MessagePattern(MESSAGE_PATTERN.trainers.updateProfileWithoutPasswordAndStatus)
  @UseFilters(new ExceptionFilter())
  async updateAdminWithoutPasswordAndStatus(@Payload() payload: IKafkaMessage<UpdateTrainerPayload>): Promise<UpdateResult> {
    return this.trainerService.updateProfileWithoutPasswordAndStatus(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.trainers.getSpecial)
  @UseFilters(new ExceptionFilter())
  viewSpecial(@Payload() email: IKafkaMessage<string>) {
    return this.trainerService.viewOnlyPackagesOfTrainer(email.value);
  }

}
