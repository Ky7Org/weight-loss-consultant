import {Injectable} from "@nestjs/common";
import {CampaignStatus} from "../constants/enums";
import {CampaignEntity} from "../entities/campaign.entity";
import {CreateCampaignDto} from "../dtos/campaign/create-campaign";
import {UpdateCampaignDto} from "../dtos/campaign/update-campaign";

@Injectable()
export class CampaignMapper {

  static async mapCreateCampaignDtoToEntity(dto: CreateCampaignDto) : Promise<CampaignEntity | null>{
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new CampaignEntity();


    entity.description = dto.description;
    entity.status = CampaignStatus.ACTIVE;
    entity.startDate = dto.startDate;
    entity.endDate = dto.endDate;
    entity.feedback = dto.feedback;

    //validate customer email
    // const result = await this.customerService.findById(dto.customerEmail)
    entity.customer.email = dto.customerEmail;

    return entity;
  }

  static async mapUpdateCampaignDtoToEntity(dto: UpdateCampaignDto) : Promise<CampaignEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new CampaignEntity();

    entity.id = dto.id;
    entity.description = dto.description;
    entity.status = CampaignStatus.ACTIVE;
    entity.startDate = dto.startDate;
    entity.endDate = dto.endDate;
    entity.feedback = dto.feedback;

    entity.customer.email = dto.customerEmail;
  }
}
