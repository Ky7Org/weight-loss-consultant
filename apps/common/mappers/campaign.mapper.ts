import {CampaignEntity} from "../entities/campaign.entity";
import {CampaignStatus} from "../constants/enums";
import {CustomerEntity} from "../entities/customer.entity";
import {CreateCampaignDto} from "../dtos/campaign/create-campaign.dto";
import {UpdateCampaignDto} from "../dtos/campaign/update-campaign.dto";

export class CampaignMapper {

  static async mapCreateCampaignDtoToEntity(dto: CreateCampaignDto, customer: CustomerEntity): Promise<CampaignEntity> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new CampaignEntity();
    entity.description = dto.description;
    entity.status = CampaignStatus.ACTIVE;
    entity.startDate = dto.startDate;
    entity.endDate = dto.endDate;
    entity.feedback = dto.feedback;
    entity.customer = customer;
    return entity;
  }

  static async mapUpdateCampaignDtoToEntity(dto: UpdateCampaignDto, customer: CustomerEntity): Promise<CampaignEntity> {
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
    return entity;
  }
}
