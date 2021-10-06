import { Inject, Injectable } from '@nestjs/common';
import { USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';
import { CampaignEntity } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/entities/campaign.entity';
import { CreateCampaignDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/campaign/create-campaign';
import { UpdateCampaignDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/campaign/update-campaign';
import { DeleteResult } from 'typeorm';
import {
  CREATE_CAMPAIGN,
  DELETE_CAMPAIGN_BY_ID,
  FIND_ALL_CAMPAIGNS,
  FIND_CAMPAIGN_BY_ID,
  UPDATE_CAMPAIGN_BY_ID
} from '../../../../common/routes/campaigns-management-routes';

export type UpdateCampaignPayloadType = {
  dto: UpdateCampaignDto;
  id: number;
}

@Injectable()
export class CampaignService {

  constructor(@Inject(USERS_MANAGEMENT_SERVICE_NAME)
                private readonly usersManagementServiceProxy: ClientProxy) {}

  async getCampaignDetailsWithCustomer(): Promise<CampaignEntity[]> {
    return this.usersManagementServiceProxy
      .send<CampaignEntity[], void>({cmd: FIND_ALL_CAMPAIGNS}, null)
      .toPromise();
  }

  async viewDetail(id: number): Promise<CampaignEntity> {
    return this.usersManagementServiceProxy
      .send<CampaignEntity, number>({cmd: FIND_CAMPAIGN_BY_ID}, id)
      .toPromise();
  }

  async create(dto: CreateCampaignDto): Promise<CampaignEntity> {
    return this.usersManagementServiceProxy
      .send<CampaignEntity, CreateCampaignDto>({cmd: CREATE_CAMPAIGN}, dto)
      .toPromise();
  }


  async edit(dto: UpdateCampaignDto, id: number): Promise<CampaignEntity> {
    return this.usersManagementServiceProxy
      .send<CampaignEntity, UpdateCampaignPayloadType>
      ({cmd: UPDATE_CAMPAIGN_BY_ID}, {dto: dto, id: id})
      .toPromise();
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.usersManagementServiceProxy
      .send<DeleteResult, number>
      ({cmd: DELETE_CAMPAIGN_BY_ID}, id)
      .toPromise();
  }
}
