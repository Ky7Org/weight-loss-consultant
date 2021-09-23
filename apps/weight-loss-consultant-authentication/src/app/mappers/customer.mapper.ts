import { Injectable } from '@nestjs/common';
import { CustomerDTO } from '../dtos/customer.dto';
import { CustomerEntity } from '../entities/customer.entity';

@Injectable()
export class CustomerMapper {
  async mapDTOToEntity(dto: CustomerDTO): Promise<CustomerEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new CustomerEntity();
    entity.email = dto.email;
    entity.password = dto.password;
    entity.fullname = dto.fullname;
    entity.address = dto.address;
    entity.phone = dto.phone;
    entity.gender = dto.gender;
    entity.status = dto.status;
    entity.dob = dto.dob;
    return entity;

  }

  async mapEntityToDTO(entity: CustomerEntity): Promise<CustomerDTO | null> {
    if (entity === null || entity === undefined) {
      return null;
    }
    const dto = new CustomerDTO();
    dto.email = entity.email;
    dto.password = entity.password;
    dto.fullname = entity.fullname;
    dto.address = entity.address;
    dto.phone = entity.phone;
    dto.gender = entity.gender;
    dto.status = entity.status;
    dto.dob = entity.dob;
    return dto;
  }
}
