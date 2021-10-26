import { Inject, Injectable } from '@nestjs/common';
import {CAMPAIGN_MANAGEMENT_SERVICE_NAME} from '../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';
import { DeleteResult } from 'typeorm';
import {
  CREATE_CAMPAIGN,
  DELETE_CAMPAIGN_BY_ID,
  FIND_ALL_CAMPAIGNS,
  FIND_CAMPAIGN_BY_ID,
  UPDATE_CAMPAIGN_BY_ID
} from '../../../../common/routes/campaigns-management-routes';
import { CampaignEntity } from '../entities/campaign.entity';
import { UpdateCampaignDto } from '../dtos/campaign/update-campaign';
import { CreateCampaignDto } from '../dtos/campaign/create-campaign';
import { UpdateCampaignPayloadType } from '../../../../common/dtos/update-campaign-dto.payload';

@Injectable()
export class CampaignService {

  constructor(
              @Inject(CAMPAIGN_MANAGEMENT_SERVICE_NAME)
              private readonly campaignManagementServiceProxy: ClientProxy
  ) {}

  async getCampaignDetailsWithCustomer(): Promise<CampaignEntity[]> {
    return this.campaignManagementServiceProxy
      .send<CampaignEntity[], Record<string, unknown> >({cmd: FIND_ALL_CAMPAIGNS}, {})
      .toPromise();
  }

  async viewDetail(id: number): Promise<CampaignEntity> {
    return this.campaignManagementServiceProxy
      .send<CampaignEntity, number>({cmd: FIND_CAMPAIGN_BY_ID}, id)
      .toPromise();
  }

  async create(dto: CreateCampaignDto): Promise<CampaignEntity> {
    return this.campaignManagementServiceProxy
      .send<CampaignEntity, CreateCampaignDto>({cmd: CREATE_CAMPAIGN}, dto)
      .toPromise();
  }


  async edit(dto: UpdateCampaignDto, id: number): Promise<CampaignEntity> {
    return this.campaignManagementServiceProxy
      .send<CampaignEntity, UpdateCampaignPayloadType>
      ({cmd: UPDATE_CAMPAIGN_BY_ID}, {dto: dto, id: id})
      .toPromise();
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.campaignManagementServiceProxy
      .send<DeleteResult, number>
      ({cmd: DELETE_CAMPAIGN_BY_ID}, id)
      .toPromise();
  }
}
