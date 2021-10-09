import {CreatePackageDto} from '../dtos/package/create-package.dto';
import {PackageEntity} from '../entities/package.entity';
import {UpdatePackageDto} from '../dtos/package/update-package.dto';
import {PackageStatus} from '../constants/enums';
import {TrainerEntity} from '../entities/trainer.entity';

export class PackageMapper {

  static async mapCreatePackageDtoToEntity(dto: CreatePackageDto, trainer : TrainerEntity) : Promise<PackageEntity>{
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

  static async mapUpdatePackageDtoToEntity(dto: UpdatePackageDto, trainer : TrainerEntity) : Promise<PackageEntity> {
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
