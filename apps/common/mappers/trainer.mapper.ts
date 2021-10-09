import {CreateTrainerDto} from '../dtos/trainer/create-trainer.dto';
import {TrainerEntity} from '../entities/trainer.entity';
import {UpdateTrainerDto} from '../dtos/trainer/update-trainer.dto';
import {AccountStatus} from '../constants/enums';

export class TrainerMapper {
  static async mapCreateDtoToEntity(dto: CreateTrainerDto): Promise<TrainerEntity> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new TrainerEntity();
    entity.email = dto.email;
    entity.password = dto.password;
    entity.status = AccountStatus.PENDING;
    entity.fullname = undefined;
    entity.address = undefined;
    entity.phone = undefined;
    entity.gender = undefined;
    entity.profileImage = undefined;
    entity.dob = undefined;
    entity.yearOfExp = undefined;
    entity.rating = undefined;
    return entity;
  }

  static async mapUpdateTrainerDTOToEntity(dto: UpdateTrainerDto) : Promise<TrainerEntity> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new TrainerEntity();
    entity.email = dto.email;
    entity.password = dto.password;
    entity.status = dto.status;
    entity.fullname = dto.fullname;
    entity.address = dto.address;
    entity.phone = dto.phone;
    entity.gender = dto.gender;
    entity.profileImage = dto.profileImage;
    entity.dob = dto.dob;
    entity.yearOfExp = dto.yearOfExp;
    entity.rating = dto.rating;
    return entity;
  }
}
