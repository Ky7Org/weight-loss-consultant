import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CampaignEntity } from '../entities/campaign.entity';
import { UpdateCampaignDto } from '../dtos/campaign/update-campaign';
import { CreateCampaignDto } from '../dtos/campaign/create-campaign';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_CAMPAIGNS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CampaignService implements OnModuleInit, OnModuleDestroy {

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
  async getCampaignDetailsWithCustomer(): Promise<CampaignEntity[]> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getAll, ''));
  }

  async getAvailableCampaigns(): Promise<CampaignEntity[]> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getAvailableCampaigns, ''));
  }

  async viewDetail(id: number): Promise<CampaignEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.getByID, id));
  }

  async create(dto: CreateCampaignDto): Promise<CampaignEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.create, dto));
  }

  async edit(dto: UpdateCampaignDto, id: number): Promise<CampaignEntity> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.update, {dto: dto, id: id}));
  }

  async delete(id: number): Promise<DeleteResult> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.delete, id));
  }
}
