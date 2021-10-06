import {Injectable} from "@nestjs/common";
import {CreateTrainerDto} from "../dtos/trainer/create-trainer";
import {TrainerEntity} from "../entities/trainer.entity";
import {UpdateTrainerDto} from "../dtos/trainer/update-trainer";
import {AccountStatus} from "../constants/enums";


@Injectable()
export class TrainerMapper {
  static async mapCreateDtoToEntity(dto: CreateTrainerDto): Promise<TrainerEntity | null> {
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

  static async mapUpdateTrainerDTOToEntity(dto: UpdateTrainerDto) : Promise<TrainerEntity | null> {
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
