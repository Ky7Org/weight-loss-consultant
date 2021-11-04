import { Injectable } from '@nestjs/common';
import { CreateHealthInfoDto } from '../dtos/heath-info/create-health-info.dto';
import { CustomerEntity } from '../entities/customer.entity';
import { HeathInfoEntity } from '../entities/health-info.entity';
import { UpdateHealthInfoDto } from '../dtos/heath-info/update-health-info.dto';

@Injectable()
export class HealthInfoMapper {

  static async mapCreateHealthDtoToEntity(dto: CreateHealthInfoDto, customer : CustomerEntity) : Promise<HeathInfoEntity | null>{
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new HeathInfoEntity();

    entity.weight = dto.weight;
    entity.height = dto.height;
    entity.medicalHistory = dto.medicalHistory;
    entity.exerciseHabit = dto.exerciseHabit;
    entity.diet = dto.diet;
    entity.timestamp = dto.timestamp;

    entity.customer = customer;

    return entity;
  }

  static async mapUpdateHealthDtoToEntity(dto: UpdateHealthInfoDto, customer : CustomerEntity) : Promise<HeathInfoEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new HeathInfoEntity();

    entity.weight = dto.weight;
    entity.height = dto.height;
    entity.medicalHistory = dto.medicalHistory;
    entity.exerciseHabit = dto.exerciseHabit;
    entity.diet = dto.diet;
    entity.timestamp = dto.timestamp;
    entity.customer = customer;
    return entity;
  }
}
