import {CreateCustDto} from "../dtos/customer/create-customer.dto";
import {CustomerEntity} from "../entities/customer.entity";
import {UpdateCustDto} from "../dtos/customer/update-customer-dto";
import {Injectable} from "@nestjs/common";
import {AccountStatus} from "../constants/enums";

@Injectable()
export class CustomerMapper {
  static async mapCreateCustDtoToEntity(dto: CreateCustDto) : Promise<CustomerEntity | null>{
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new CustomerEntity();

    entity.email = dto.email;
    entity.password = dto.password;
    entity.fullname = undefined;
    entity.address = undefined;
    entity.phone = undefined;
    entity.gender = undefined;
    entity.status = AccountStatus.ACTIVE;
    entity.profileImage = undefined;
    entity.dob = undefined;

    return entity;
  }

  static async mapUpdateCustDtoToEntity(dto: UpdateCustDto) : Promise<CustomerEntity | null> {
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
    entity.profileImage = dto.profileImage;
    dto.dob = entity.dob;

    return entity;
  }
}
