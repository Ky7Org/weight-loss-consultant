import { TrainerDTO } from '../dtos/trainer.dto';
import { TrainerEntity } from '../entities/trainer.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TrainerMapper {
  async mapDTOtoEntity(trainerDTO: TrainerDTO): Promise<TrainerEntity | null> {
    if (trainerDTO === null || trainerDTO === undefined) {
      return null;
    }
    const entity = new TrainerEntity();
    entity.email = trainerDTO.email;
    entity.password = trainerDTO.password;
    entity.fullname = trainerDTO.fullname;
    entity.address = trainerDTO.address;
    entity.phone = trainerDTO.phone;
    entity.gender = trainerDTO.gender;
    entity.status = trainerDTO.status;
    entity.profileImage = trainerDTO.profileImage;
    entity.dob = trainerDTO.dob;
    entity.yearOfExp = trainerDTO.yearOfExp;
    entity.rating = trainerDTO.rating;
    return entity;
  }

  async mapEntityToDTO(entity: TrainerEntity): Promise<TrainerDTO | null> {
    if (entity === null || entity === undefined) {
      return null;
    }
    const dto = new TrainerDTO();
    dto.email = entity.email;
    dto.password = entity.password;
    dto.fullname = entity.fullname;
    dto.address = entity.address;
    dto.phone = entity.phone;
    dto.gender = entity.gender;
    dto.status = entity.status;
    dto.profileImage = entity.profileImage;
    dto.dob = entity.dob;
    dto.yearOfExp = entity.yearOfExp;
    dto.rating = entity.rating;
    return dto;
  }
}
