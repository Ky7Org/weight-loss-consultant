import { Injectable } from '@nestjs/common';
import {CreateContractDto} from "../dtos/contract/create-health-info.dto";
import {CampaignEntity} from "../entities/campaign.entity";
import {PackageEntity} from "../entities/package.enttiy";
import {ContractEntity} from "../entities/contract.entity";
import {UpdateContractDto} from "../dtos/contract/update-health-info.dto";
import {ContractStatus} from "../constants/enums";
import {CONTRACT_STATUS} from "../../../../common/utils";

@Injectable()
export class ContractMapper {

  static async mapCreateContractDtoToEntity(dto: CreateContractDto, campaign : CampaignEntity, p: PackageEntity) : Promise<ContractEntity | null>{
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new ContractEntity();

    entity.totalPrice = dto.totalPrice;
    entity.timeOfExpired = dto.timeOfExpired;
    entity.timeOfCreate = dto.timeOfCreate;
    entity.status = CONTRACT_STATUS.ONGOING;
    entity.campaign = campaign;
    entity.package = p;

    return entity;
  }

  static async mapUpdateContractDtoToEntity(dto: UpdateContractDto,campaign : CampaignEntity, p: PackageEntity) : Promise<ContractEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new ContractEntity();

    entity.totalPrice = dto.totalPrice;
    entity.timeOfExpired = dto.timeOfExpired;
    entity.timeOfCreate = dto.timeOfCreate;
    entity.status = dto.status;
    entity.campaign = campaign;
    entity.package = p;
    return entity;
  }
}
