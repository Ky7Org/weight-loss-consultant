import { Body, Controller, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCampaignDto } from '../dtos/campaign/create-campaign';
import { CampaignService } from '../services/impl/campaign.service.impl';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CREATE_CAMPAIGN,
  DELETE_CAMPAIGN_BY_ID,
  FIND_ALL_CAMPAIGNS,
  FIND_CAMPAIGN_BY_ID,
  UPDATE_CAMPAIGN_BY_ID
} from '../../../../common/routes/campaigns-management-routes';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import { UpdateCampaignPayloadType } from '../../../../common/dtos/update-campaign-dto.payload';

@ApiTags('Campaign')
@ApiBearerAuth()
@Controller('/v1/campaigns')
export class CampaignController {

  constructor(private readonly campaignService: CampaignService) {
  }

  @MessagePattern({cmd: FIND_ALL_CAMPAIGNS})
  @UseFilters(new ExceptionFilter())
  async index() {
    return this.campaignService.getCampaignDetailsWithCustomer();
  }

  @MessagePattern({cmd: FIND_CAMPAIGN_BY_ID})
  @UseFilters(new ExceptionFilter())
  async getByID(@Payload() id: string) {
    return this.campaignService.viewDetail(id);
  }

  @MessagePattern({cmd: CREATE_CAMPAIGN})
  @UseFilters(new ExceptionFilter())
  async create(@Body() dto: CreateCampaignDto) {
    return this.campaignService.create(dto);
  }

  @MessagePattern({cmd: UPDATE_CAMPAIGN_BY_ID})
  @UseFilters(new ExceptionFilter())
  async update(@Payload() updatePayload: UpdateCampaignPayloadType) {
    return this.campaignService.edit(updatePayload.dto, updatePayload.id);
  }

  @MessagePattern({cmd: DELETE_CAMPAIGN_BY_ID})
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() id: number) {
    return this.campaignService.delete(id);
  }
}
