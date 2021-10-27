import { Injectable } from '@nestjs/common';
import { CampaignEntity } from '../entities/campaign.entity';
import { CreateCampaignDto } from '../../../../weight-loss-consultant-campaign-mgnt-api/src/app/dtos/campaign/create-campaign';
import { UpdateCampaignDto } from '../../../../weight-loss-consultant-campaign-mgnt-api/src/app/dtos/campaign/update-campaign';
import { CustomerEntity } from '../entities/customer.entity';
import { CampaignStatus } from '../constants/enums';

@Injectable()
export class CampaignMapper {

  static async mapCreateCampaignDtoToEntity(dto: CreateCampaignDto, customer : CustomerEntity) : Promise<CampaignEntity | null>{
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new CampaignEntity();

    entity.description = dto.description;
    entity.status = CampaignStatus.ACTIVE;
    entity.startDate = dto.startDate;
    entity.endDate = dto.endDate;
    entity.feedback = dto.feedback;
    entity.targetWeight = dto.targetWeight;
    entity.currentWeight = dto.currentWeight;
    entity.spendTimeForTraining = dto.spendTimeForTraining
    entity.customer = customer;

    return entity;
  }

  static async mapUpdateCampaignDtoToEntity(dto: UpdateCampaignDto, customer : CustomerEntity) : Promise<CampaignEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new CampaignEntity();

    entity.description = dto.description;
    entity.status = dto.status;
    entity.startDate = dto.startDate;
    entity.endDate = dto.endDate;
    entity.feedback = dto.feedback;
    entity.customer = customer;
    entity.targetWeight = dto.targetWeight;
    entity.currentWeight = dto.currentWeight;
    entity.spendTimeForTraining = dto.spendTimeForTraining
    return entity;
  }
}
