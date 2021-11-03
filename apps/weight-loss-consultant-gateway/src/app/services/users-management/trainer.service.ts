import {Inject, Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import { USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../../constant';
import {ClientKafka, ClientProxy} from '@nestjs/microservices';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  CREATE_TRAINER,
  DELETE_TRAINER,
  GET_ALL_TRAINERS,
  GET_TRAINER_BY_EMAIL,
  UPDATE_TRAINER, UPDATE_TRAINER_WITHOUT_PASSWORD_AND_STATUS, VIEW_DETAIL_SPECIAL_TRAINER,
} from '../../../../../common/routes/users-management-service-routes';
import { UpdateTrainerPayloadType } from '../../../../../common/dtos/update-trainer-dto.payload';
import { TrainerEntity } from '../../entities/trainer.entity';
import { UpdateTrainerDto } from '../../dtos/trainer/update-trainer';
import { CreateTrainerDto } from '../../dtos/trainer/create-trainer';
import {UpdateTrainerPayload} from "../../../../../common/dtos/update-without-password-and-status.payload";
import {KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN} from "../../../../../common/kafka-utils";
import {lastValueFrom} from "rxjs";

@Injectable()
export class TrainerService implements OnModuleInit, OnModuleDestroy {

  @Inject('SERVER')
  private readonly client: ClientKafka;

  async onModuleInit() {
    for (const [key, value] of Object.entries(MESSAGE_PATTERN.trainers)) {
      this.client.subscribeToResponseOf(value);
    }
    this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async findAll(): Promise<TrainerEntity[]> {
    return lastValueFrom<TrainerEntity[]>(this.client.send(MESSAGE_PATTERN.trainers.getAllTrainers, ''));
  }

  async delete(email: string): Promise<DeleteResult> {
    return lastValueFrom<DeleteResult>(this.client.send(MESSAGE_PATTERN.trainers.delete, email));
  }

  async edit(dto: UpdateTrainerDto, email: string): Promise<UpdateResult> {
    return lastValueFrom<UpdateResult>(this.client.send(MESSAGE_PATTERN.trainers.update, { email: email, dto: dto }));
  }

  async create(dto: CreateTrainerDto): Promise<TrainerEntity> {
    return lastValueFrom<TrainerEntity>(this.client.send(MESSAGE_PATTERN.trainers.create, dto));
  }

  async viewDetail(email: string): Promise<TrainerEntity> {
    return lastValueFrom<TrainerEntity>(this.client.send(MESSAGE_PATTERN.trainers.getByEmail, email));
  }

  async viewSpecial(email : string) : Promise<TrainerEntity> {
    return lastValueFrom<TrainerEntity>(this.client.send(MESSAGE_PATTERN.trainers.getSpecial, email));
  }

  async updateWithoutPasswordAndStatus(payload: UpdateTrainerPayload) : Promise<UpdateResult> {
    return lastValueFrom<UpdateResult>(this.client.send(MESSAGE_PATTERN.trainers.updateProfileWithoutPasswordAndStatus, payload));
  }
}