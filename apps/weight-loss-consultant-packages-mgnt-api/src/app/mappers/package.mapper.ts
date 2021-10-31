import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from '../dtos/package/create-package';
import { PackageEntity } from '../entities/package.enttiy';
import { UpdatePackageDto } from '../dtos/package/update-package';
import { TrainerEntity } from '../entities/trainer.entity';
import {PACKAGE_STATUS} from "../../../../common/utils";

@Injectable()
export class PackageMapper {

  static async mapCreatePackageDtoToEntity(dto: CreatePackageDto, trainer : TrainerEntity) : Promise<PackageEntity | null>{
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new PackageEntity();

    const createDate = new Date().getTime();
    entity.exercisePlan = dto.exercisePlan;
    entity.schedule = dto.schedule;
    entity.price = dto.price;
    entity.status = PACKAGE_STATUS.ACTIVE;
    entity.dietPlan = dto.dietPlan;
    entity.trainer = trainer;
    entity.name = dto.name;
    entity.spendTimeToTraining = dto.spendTimeToTraining;
    entity.sessionLength = dto.sessionLength;
    entity.createDate=createDate;
    entity.startDate = dto.startDate;
    entity.endDate = dto.endDate;
    return entity;
  }

  static async mapUpdatePackageDtoToEntity(dto: UpdatePackageDto, trainer : TrainerEntity) : Promise<PackageEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new PackageEntity();
    const createDate = new Date().getTime();

    entity.id = dto.id;
    entity.exercisePlan = dto.exercisePlan;
    entity.schedule = dto.schedule;
    entity.price = dto.price;
    entity.status = dto.status;
    entity.dietPlan = dto.dietPlan;
    entity.trainer = trainer;
    entity.name = dto.name;
    entity.spendTimeToTraining = dto.spendTimeToTraining;
    entity.sessionLength = dto.sessionLength;
    entity.startDate = dto.startDate;
    entity.endDate = dto.endDate;

    return entity;
  }
}
