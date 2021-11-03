import {Body, Controller, UseFilters} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {CreateCampaignDto} from '../dtos/campaign/create-campaign';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {
  CREATE_CAMPAIGN,
  DELETE_CAMPAIGN_BY_ID,
  FIND_ALL_CAMPAIGNS,
  FIND_CAMPAIGN_BY_ID,
  GET_AVAILABLE_CAMPAIGNS,
  UPDATE_CAMPAIGN_BY_ID, UPDATE_STATUS_CAMPAIGN
} from '../../../../common/routes/campaigns-management-routes';
import {ExceptionFilter} from '../../../../common/filters/rpc-exception.filter';
import {
  UpdateCampaignPayloadType,
  UpdateStatusCampaignPayload
} from '../../../../common/dtos/update-campaign-dto.payload';
import {CampaignService} from "../services/campaign.service";

@ApiTags('Campaign')
@ApiBearerAuth()
@Controller('/v1/campaigns')
export class CampaignController {

  constructor(private readonly campaignService: CampaignService) {
  }

  @MessagePattern({cmd: FIND_ALL_CAMPAIGNS})
  @UseFilters(new ExceptionFilter())
  async index() {
    console.log("campaign controller - campaign service")
    return this.campaignService.getCampaignDetailsWithCustomer();
  }

  @MessagePattern({cmd: GET_AVAILABLE_CAMPAIGNS})
  @UseFilters(new ExceptionFilter())
  async getAvailCampaigns() {
    return this.campaignService.getAvailCampaigns();
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

  @MessagePattern({cmd: UPDATE_STATUS_CAMPAIGN})
  @UseFilters(new ExceptionFilter())
  async updateStatus(@Payload() payload: UpdateStatusCampaignPayload) {
    return this.campaignService.updateStatus(payload);
  }
}
