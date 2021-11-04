import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { DeleteResult } from 'typeorm';
import { HeathInfoEntity } from '../entities/health-info.entity';
import { CreateHealthInfoDto } from '../dtos/heath-info/create-health-info.dto';
import { UpdateHealthInfoDto } from '../dtos/heath-info/update-health-info.dto';
import { KAFKA_HEALTH_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class HealthInfoService implements OnModuleInit, OnModuleDestroy {

  @Inject('SERVER')
  private client: ClientKafka;

  async onModuleInit() {
    for (const [key, value] of Object.entries(MESSAGE_PATTERN)) {
      this.client.subscribeToResponseOf(value);
    }
    this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async getHealthInfosWithCustomer(): Promise<HeathInfoEntity[]> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.create, ''));
  }

  async viewDetail(id: number): Promise<HeathInfoEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getByID, id));
  }

  async create(dto: CreateHealthInfoDto): Promise<HeathInfoEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.create, dto));
  }

  async edit(dto: UpdateHealthInfoDto, id: number): Promise<void> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.update, {dto: dto, id: id}));
  }

  async delete(id: number): Promise<DeleteResult> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.delete, id));
  }
}
