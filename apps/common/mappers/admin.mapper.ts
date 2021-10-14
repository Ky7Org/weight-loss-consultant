import {CreateAdminDto} from "../dtos/admin/create-admin.dto";
import {AdminEntity} from "../entities/admin.entity";
import {UpdateAdminDto} from "../dtos/admin/update-admin.dto";
import {AccountStatus} from "../constants/enums";
import { AdminDto } from '../../weight-loss-consultant-users-mgnt-api/src/app/dtos/admin/admin.dto';

export class AdminMapper {
  static mapEntityToDTO(entity: AdminEntity): AdminDto {
    if (entity === null || entity === undefined) {
      return null;
    }
    const dto = new AdminDto();
    dto.email = entity.email;
    dto.password = entity.password;
    dto.status = entity.status;
    dto.fullname = entity.fullname;
    dto.address = entity.address;
    dto.phone = entity.phone;
    dto.gender = entity.gender;
    dto.profileImage = entity.profileImage;
    dto.dob = entity.dob;
    return dto;
  }

  static mapEntitiesToDTOs(entities: AdminEntity[]): AdminDto[] {
    return entities.map((entity) => AdminMapper.mapEntityToDTO(entity));
  }

  static mapDtosToEntities(dtos: AdminDto[]): AdminEntity[] {
    return dtos.map((dto) => AdminMapper.mapDTOToEntity(dto));
  }

  static mapDTOToEntity(dto: AdminDto): AdminEntity {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new AdminEntity();
    entity.email = dto.email;
    entity.password = dto.password;
    entity.status = dto.status;
    entity.fullname = dto.fullname;
    entity.address = dto.address;
    entity.phone = dto.phone;
    entity.gender = dto.gender;
    entity.profileImage = dto.profileImage;
    entity.dob = dto.dob;
    return entity;
  }

  static async mapCreateAdminDTOToEntity(dto: CreateAdminDto): Promise<AdminEntity> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new AdminEntity();
    entity.email = dto.email;
    entity.password = dto.password;
    entity.status = AccountStatus.ACTIVE;
    entity.fullname = undefined;
    entity.address = undefined;
    entity.phone = undefined;
    entity.gender = undefined;
    entity.profileImage = undefined;
    entity.dob = undefined;
    return entity;
  }


  static async mapUpdateAdminDTOToEntity(dto: UpdateAdminDto): Promise<AdminEntity> {
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
