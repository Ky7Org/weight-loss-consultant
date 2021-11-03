import {Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import {Client, ClientKafka} from '@nestjs/microservices';
import {DeleteResult, UpdateResult} from 'typeorm';
import {TrainerEntity} from '../../entities/trainer.entity';
import {UpdateTrainerDto} from '../../dtos/trainer/update-trainer';
import {CreateTrainerDto} from '../../dtos/trainer/create-trainer';
import {KAFKA_USERS_MANAGEMENT_SERVICE} from "../../../../../common/kafka-utils";
import {lastValueFrom} from "rxjs";
import {KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN} from "../../../../../common/kafka-utils";

@Injectable()
export class TrainerService implements OnModuleInit, OnModuleDestroy {

  @Client(KAFKA_USERS_MANAGEMENT_SERVICE)
  private readonly client: ClientKafka;

  async onModuleInit() {
    for (const [key, value] of Object.entries(MESSAGE_PATTERN.trainers)) {
      this.client.subscribeToResponseOf(value);
    }
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  findAll(): Promise<TrainerEntity[]> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.trainers.getAllTrainers, ''));
  }

  delete(email: string): Promise<DeleteResult> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.trainers.delete, email));
  }

  async edit(dto: UpdateTrainerDto, email: string): Promise<UpdateResult> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.trainers.update, {email: email, dto: dto}));
  }

  async create(dto: CreateTrainerDto): Promise<TrainerEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.trainers.create, dto));
  }

  async viewDetail(email: string): Promise<TrainerEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.trainers.getByEmail, email));
  }

  async viewSpecial(email: string): Promise<TrainerEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.trainers.getSpecial, email));
  }
}
