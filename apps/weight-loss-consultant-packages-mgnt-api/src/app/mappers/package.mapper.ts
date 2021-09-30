import {Injectable} from "@nestjs/common";
import {CampaignStatus, PackageStatus} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/constants/enums";
import {CampaignEntity} from "../entities/campaign.entity";
import {UpdateCampaignDto} from "../dtos/campaign/update-campaign";
import {CustomerEntity} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/entities/customer.entity";
import {CreatePackageDto} from "../dtos/package/create-package";
import {TrainerEntity} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/entities/trainer.entity";
import {PackageEntity} from "../entities/package.enttiy";
import {UpdatePackageDto} from "../dtos/package/update-package";

@Injectable()
export class PackageMapper {

  static async mapCreatePackageDtoToEntity(dto: CreatePackageDto, trainer : TrainerEntity) : Promise<PackageEntity | null>{
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new PackageEntity();

    entity.exercisePlan = dto.exercisePlan;
    entity.schedule = dto.schedule;
    entity.price = dto.price;
    entity.status = PackageStatus.ACTIVE;
    entity.dietPlan = dto.dietPlan;
    entity.trainer = trainer;

    return entity;
  }

  static async mapUpdatePackageDtoToEntity(dto: UpdatePackageDto, trainer : TrainerEntity) : Promise<PackageEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new PackageEntity();

    entity.id = dto.id;
    entity.exercisePlan = dto.exercisePlan;
    entity.schedule = dto.schedule;
    entity.price = dto.price;
    entity.status = dto.status;
    entity.dietPlan = dto.dietPlan;
    entity.trainer = trainer;

    return entity;
  }
}
