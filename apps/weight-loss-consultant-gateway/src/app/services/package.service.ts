import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';

import { CREATE_PACKAGE } from '../../../../common/routes/packages-management-routes';
import { CreatePackageDto } from '../dtos/package/create-package';
import { PackageEntity } from '../entities/package.entity';
import { UpdatePackageDto } from '../dtos/package/update-package';
import { KAFKA_PACKAGES_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PackageService implements OnModuleInit, OnModuleDestroy {

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

  async delete(id: number): Promise<DeleteResult> {
      return lastValueFrom(this.client.send(MESSAGE_PATTERN.delete, id));
  }

  async getPackageDetailsWithTrainer(): Promise<PackageEntity[]> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getAll, ''));
  }

  async viewDetail(id: number): Promise<PackageEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getByID, id));
  }

  async create(dto: CreatePackageDto): Promise<PackageEntity> {
    return lastValueFrom(this.client.send({cmd: CREATE_PACKAGE}, dto));
  }

  async edit(dto: UpdatePackageDto, id: number): Promise<void> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.update, {dto: dto, id: id}));
  }
}
