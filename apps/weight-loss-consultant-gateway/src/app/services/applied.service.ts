import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { DeleteResult } from 'typeorm';
import { AppliedEntity } from '../entities/applied.entity';
import { CreateAppliedDto } from '../dtos/applied/create_applied_dto';
import { UpdateAppliedDto } from '../dtos/applied/update_applied_dto';
import { ApprovePayload } from '../../../../common/dtos/update-package-dto.payload';
import { KAFKA_APPLIED_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppliedService implements OnModuleInit, OnModuleDestroy {

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
  async getAll(): Promise<AppliedEntity[]> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getAll, ''));
  }

  async viewDetail(id: number): Promise<AppliedEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getByID, id));
  }

  async create(dto: CreateAppliedDto): Promise<AppliedEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.create, dto));
  }


  async edit(dto: UpdateAppliedDto, id: number): Promise<void> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.update, {dto: dto, id: id}));
  }

  async delete(id: number): Promise<DeleteResult> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.delete, id));
  }
  async getAppliedPackagesByCampaignID(campaignID: number): Promise<any> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getByCampaignID, campaignID));
  }

  async approvePackage(payload: ApprovePayload): Promise<any> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.approvePackage, payload));
  }
}
