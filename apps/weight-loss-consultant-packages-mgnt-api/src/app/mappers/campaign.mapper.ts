import {Injectable} from "@nestjs/common";
import {CampaignStatus} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/constants/enums";
import {CampaignEntity} from "../entities/campaign.entity";
import {CreateCampaignDto} from "../dtos/campaign/create-campaign";
import {UpdateCampaignDto} from "../dtos/campaign/update-campaign";
import {CustomerEntity} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/entities/customer.entity";

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
    return entity;
  }
}
