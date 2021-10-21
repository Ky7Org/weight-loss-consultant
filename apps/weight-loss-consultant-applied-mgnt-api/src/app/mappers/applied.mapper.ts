import { Injectable } from '@nestjs/common';
import {CampaignEntity} from "../entities/campaign.entity";
import {PackageEntity} from "../entities/package.enttiy";
import {CreateAppliedDto} from "../dtos/applied/create_applied_dto";
import {AppliedEntity} from "../entities/applied.entity";
import {UpdateAppliedDto} from "../dtos/applied/update_applied_dto";

@Injectable()
export class AppliedMapper {

  static async mapCreateContractDtoToEntity(dto: CreateAppliedDto, campaign : CampaignEntity, p: PackageEntity) : Promise<AppliedEntity | null>{
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new AppliedEntity();

    entity.campaign = campaign;
    entity.package = p;

    return entity;
  }

  static async mapUpdateContractDtoToEntity(dto: UpdateAppliedDto,campaign : CampaignEntity, p: PackageEntity) : Promise<AppliedEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new AppliedEntity();

    entity.campaign = campaign;
    entity.package = p;
    return entity;
  }
}
