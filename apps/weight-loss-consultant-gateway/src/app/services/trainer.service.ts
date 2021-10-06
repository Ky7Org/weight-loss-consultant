import { Inject, Injectable } from '@nestjs/common';
import { USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  CREATE_TRAINER,
  DELETE_TRAINER,
  GET_ALL_TRAINERS,
  GET_TRAINER_BY_EMAIL,
  UPDATE_TRAINER
} from '../../../../common/routes/users-management-service-routes';
import { UpdateTrainerPayloadType } from '../../../../common/dtos/update-trainer-dto.payload';
import { TrainerEntity } from '../entities/trainer.entity';
import { UpdateTrainerDto } from '../dtos/trainer/update-trainer';
import { CreateTrainerDto } from '../dtos/trainer/create-trainer';

@Injectable()
export class TrainerService {

  constructor(@Inject(USERS_MANAGEMENT_SERVICE_NAME)
              private readonly usersManagementProxy: ClientProxy) {
  }

  async findAll(): Promise<TrainerEntity[]> {
    return this.usersManagementProxy.send<TrainerEntity[], Record<string, unknown>>({ cmd: GET_ALL_TRAINERS }, {})
      .toPromise();
  }

  async delete(email: string): Promise<DeleteResult> {
    return this.usersManagementProxy.send<DeleteResult, string>({ cmd: DELETE_TRAINER }, email)
      .toPromise();
  }

  async edit(dto: UpdateTrainerDto, email: string): Promise<UpdateResult> {
    return this.usersManagementProxy.send<UpdateResult, UpdateTrainerPayloadType>
    ({ cmd: UPDATE_TRAINER }, { email: email, dto: dto })
      .toPromise();
  }

  async create(dto: CreateTrainerDto): Promise<TrainerEntity> {
    return this.usersManagementProxy.send<TrainerEntity, CreateTrainerDto>({ cmd: CREATE_TRAINER }, dto)
      .toPromise();
  }

  async viewDetail(email: string): Promise<TrainerEntity> {
    return this.usersManagementProxy.send<TrainerEntity, string>({ cmd: GET_TRAINER_BY_EMAIL }, email)
      .toPromise();
  }
}
