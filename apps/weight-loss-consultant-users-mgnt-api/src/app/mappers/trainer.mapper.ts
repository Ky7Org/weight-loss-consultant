import {Injectable} from "@nestjs/common";
import {CreateTrainerDto} from "../dtos/trainer/create-trainer";
import {UpdateAdminDto} from "../dtos/admin/update-admin.dto";
import {TrainerEntity} from "../entities/trainer.entity";
import {UpdateTrainerDto} from "../dtos/trainer/update-trainer";


@Injectable()
export class TrainerMapper {
  static async mapCreateDtoToEntity(dto: CreateTrainerDto): Promise<TrainerEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new TrainerEntity();
    entity.email = dto.email;
    entity.password = dto.password;
    entity.status = 1;
    entity.fullname = "";
    entity.address = "";
    entity.phone = "";
    entity.gender = "";
    entity.profileImage = "";
    entity.dob = 946659600000;
    entity.yearOfExp = 0;
    entity.rating = 0;
    return entity;
  }

  static async mapUpdateTrainerDTOToEntity(dto: UpdateTrainerDto) : Promise<TrainerEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new TrainerEntity();
    entity.email = dto.email;
    entity.password = dto.password;
    entity.status = 1;
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
