import { Body, ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {CreateCampaignDto} from '../dtos/campaign/create-campaign';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {ExceptionFilter} from '../../../../common/filters/rpc-exception.filter';
import {
  UpdateCampaignPayloadType,
  UpdateStatusCampaignPayload
} from '../../../../common/dtos/update-campaign-dto.payload';
import {CampaignService} from "../services/campaign.service";
import { KAFKA_CAMPAIGNS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';
import { IKafkaMessage } from '../../../../common/kafka-message.model';

@UseInterceptors(ClassSerializerInterceptor)
export class CampaignController {

  constructor(private readonly campaignService: CampaignService) {
  }

  @MessagePattern(MESSAGE_PATTERN.getAll)
  @UseFilters(new ExceptionFilter())
  async index() {
    return this.campaignService.getCampaignDetailsWithCustomer();
  }

  @MessagePattern(MESSAGE_PATTERN.getAvailableCampaigns)
  @UseFilters(new ExceptionFilter())
  async getAvailCampaigns() {
    return this.campaignService.getAvailCampaigns();
  }

  @MessagePattern(MESSAGE_PATTERN.getAvailableCampaigns)
  @UseFilters(new ExceptionFilter())
  async getByID(@Payload() payload: IKafkaMessage<string>) {
    return this.campaignService.viewDetail(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.create)
  @UseFilters(new ExceptionFilter())
  async create(@Payload() payload: IKafkaMessage<CreateCampaignDto>) {
    return this.campaignService.create(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.update)
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: IKafkaMessage<UpdateCampaignPayloadType>) {
    return this.campaignService.edit(payload.value.dto, payload.value.id);
  }

  @MessagePattern(MESSAGE_PATTERN.delete)
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() payload: IKafkaMessage<number>) {
    return this.campaignService.delete(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.updateStatus)
  @UseFilters(new ExceptionFilter())
  async updateStatus(@Payload() payload: IKafkaMessage<UpdateStatusCampaignPayload>) {
    return this.campaignService.updateStatus(payload.value);
  }
}
