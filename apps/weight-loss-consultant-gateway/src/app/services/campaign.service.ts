import { Inject, Injectable } from '@nestjs/common';
import {CAMPAIGN_MANAGEMENT_SERVICE_NAME} from '../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';
import { DeleteResult } from 'typeorm';
import {
  CREATE_CAMPAIGN,
  DELETE_CAMPAIGN_BY_ID,
  FIND_ALL_CAMPAIGNS,
  FIND_CAMPAIGN_BY_ID, GET_AVAILABLE_CAMPAIGNS,
  UPDATE_CAMPAIGN_BY_ID
} from '../../../../common/routes/campaigns-management-routes';
import { CampaignEntity } from '../entities/campaign.entity';
import { UpdateCampaignDto } from '../dtos/campaign/update-campaign';
import { CreateCampaignDto } from '../dtos/campaign/create-campaign';
import { UpdateCampaignPayloadType } from '../../../../common/dtos/update-campaign-dto.payload';

@Injectable()
export class CampaignService {
  private readonly campaignManagementServiceProxy;

  async getCampaignDetailsWithCustomer(): Promise<CampaignEntity[]> {
    return this.campaignManagementServiceProxy
      .send({cmd: FIND_ALL_CAMPAIGNS}, {})
      .toPromise();
  }

  async getAvailableCampaigns(): Promise<CampaignEntity[]> {
    return this.campaignManagementServiceProxy
      .send({cmd: GET_AVAILABLE_CAMPAIGNS}, {})
      .toPromise();
  }

  async viewDetail(id: number): Promise<CampaignEntity> {
    return this.campaignManagementServiceProxy
      .send({cmd: FIND_CAMPAIGN_BY_ID}, id)
      .toPromise();
  }

  async create(dto: CreateCampaignDto): Promise<CampaignEntity> {
    return this.campaignManagementServiceProxy
      .send({cmd: CREATE_CAMPAIGN}, dto)
      .toPromise();
  }


  async edit(dto: UpdateCampaignDto, id: number): Promise<CampaignEntity> {
    return this.campaignManagementServiceProxy
      .send
      ({cmd: UPDATE_CAMPAIGN_BY_ID}, {dto: dto, id: id})
      .toPromise();
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.campaignManagementServiceProxy
      .send
      ({cmd: DELETE_CAMPAIGN_BY_ID}, id)
      .toPromise();
  }
}
