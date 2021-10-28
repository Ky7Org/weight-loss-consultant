import { Controller, UseFilters } from '@nestjs/common';
import { TrainerService } from '../services/impl/trainer.service.impl';
import { CreateTrainerDto } from '../dtos/trainer/create-trainer';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CREATE_TRAINER,
  DELETE_TRAINER,
  GET_ALL_TRAINERS,
  GET_TRAINER_BY_EMAIL, UPDATE_ADMIN_WITHOUT_PASSWORD_AND_STATUS,
  UPDATE_TRAINER, UPDATE_TRAINER_WITHOUT_PASSWORD_AND_STATUS
} from '../../../../common/routes/users-management-service-routes';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import { UpdateTrainerPayloadType } from '../../../../common/dtos/update-trainer-dto.payload';
import {
  UpdateAdminPayload,
  UpdateTrainerPayload
} from "../../../../common/dtos/update-without-password-and-status.payload";
import {UpdateResult} from "typeorm";

@Controller()
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {
  }

  @MessagePattern({cmd: GET_ALL_TRAINERS})
  @UseFilters(new ExceptionFilter())
  async index() {
    return this.trainerService.findAll();
  }

  @MessagePattern({cmd: GET_TRAINER_BY_EMAIL})
  @UseFilters(new ExceptionFilter())
  async getByEmail(@Payload() email: string) {
    return this.trainerService.viewDetail(email);
  }

  @MessagePattern({cmd: CREATE_TRAINER})
  @UseFilters(new ExceptionFilter())
  async create(@Payload() dto: CreateTrainerDto) {
    return this.trainerService.create(dto);
  }

  @MessagePattern({cmd: UPDATE_TRAINER})
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: UpdateTrainerPayloadType) {
    return this.trainerService.edit(payload.dto, payload.email);
  }

  @MessagePattern({cmd: DELETE_TRAINER})
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() email) {
    return this.trainerService.delete(email);
  }

  @MessagePattern({ cmd: UPDATE_TRAINER_WITHOUT_PASSWORD_AND_STATUS })
  @UseFilters(new ExceptionFilter())
  async updateAdmninWithoutPasswordAndStatus(@Payload() payload: UpdateTrainerPayload): Promise<UpdateResult> {
    return this.trainerService.updateProfileWithoutPasswordAndStatus(payload);
  }

}
