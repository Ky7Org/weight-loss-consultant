import { Injectable } from '@nestjs/common';
import { AdminEntity } from '../entities/admin.entity';
import { AdminDTO } from '../dtos/admin.dto';

@Injectable()
export class AdminMapper {
  async mapDTOToEntity(dto: AdminDTO): Promise<AdminEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new AdminEntity();
    entity.email = dto.email;
    entity.password = dto.password;
    entity.fullname = dto.fullname;
    entity.address = dto.address;
    entity.phone = dto.phone;
    entity.gender = dto.gender;
    entity.status = dto.status;
    entity.profileImage = dto.profileImage;
    entity.dob = dto.dob;
    return entity;

  }

  async mapEntityToDTO(entity: AdminEntity): Promise<AdminDTO | null> {
    if (entity === null || entity === undefined) {
      return null;
    }
    const dto = new AdminDTO();
    dto.email = entity.email;
    dto.password = entity.password;
    dto.fullname = entity.fullname;
    dto.address = entity.address;
    dto.phone = entity.phone;
    dto.gender = entity.gender;
    dto.status = entity.status;
    dto.profileImage = entity.profileImage;
    dto.dob = entity.dob;
    return dto;
  }
}
