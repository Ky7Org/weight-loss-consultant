import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from "../dtos/admin/create-admin.dto";
import {AdminEntity} from "../entities/admin.entity";
import {UpdateAdminDto} from "../dtos/admin/update-admin.dto";
@Injectable()
export class AdminMapper {
static async mapCreateAdminDTOToEntity(dto: CreateAdminDto): Promise<AdminEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new AdminEntity();
    entity.email = dto.email;
    entity.password = dto.password;
    entity.status = 1;
    entity.fullname = "";
    entity.address = "";
    entity.phone = "";
    entity.gender = "";
    entity.profileImage = "";
    entity.dob = 946659600000;
    return entity;
  }


  static async mapUpdateAdminDTOToEntity(dto: UpdateAdminDto): Promise<AdminEntity | null> {
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
}
