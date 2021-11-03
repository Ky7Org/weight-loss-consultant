import { Controller, UseFilters } from '@nestjs/common';
import { AdminService } from '../services/impl/admin.service.impl';
import { CreateAdminDto } from '../dtos/admin/create-admin.dto';
import { UpdateAdminDto } from '../dtos/admin/update-admin.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ADMIN_VIEW_DETAIL,
  CREATE_ADMIN, CUSTOMER_VIEW_DETAIL,
  DELETE_ADMIN,
  GET_ADMIN_BY_EMAIL,
  GET_ALL_ADMINS, TRAINER_VIEW_DETAIL,
  UPDATE_ADMIN, UPDATE_ADMIN_WITHOUT_PASSWORD_AND_STATUS
} from '../../../../common/routes/users-management-service-routes';
import { AdminEntity } from '../entities/admin.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { CustomerService } from '../services/impl/customer.service.impl';
import { TrainerService } from '../services/impl/trainer.service.impl';
import { TrainerEntity } from '../entities/trainer.entity';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import {PaginationDto} from "../dtos/pagination/pagination.dto";
import {PaginatedResultDto} from "../dtos/pagination/paginated-result.dto";
import {UpdateAdminPayload} from "../../../../common/dtos/update-without-password-and-status.payload";

export type UpdateAdminType = {
  email: string;
  dto: UpdateAdminDto;
};

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AdminController {

  constructor(private readonly adminService: AdminService) {
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.admins.getAllAdmins)
  @UseFilters(new ExceptionFilter())
  async index(@Payload() payload: IKafkaMessage<PaginationDto>): Promise<PaginatedResultDto> {
    return this.adminService.findAll(payload.value);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.admins.getByEmail)
  @UseFilters(new ExceptionFilter())
  async getByEmail(@Payload() email: IKafkaMessage<string>): Promise<AdminEntity> {
    const payload =  this.adminService.viewDetail(email.value);
    return payload;
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.admins.create)
  @UseFilters(new ExceptionFilter())
  async create(@Payload() dto: IKafkaMessage<CreateAdminDto>): Promise<AdminEntity> {
    return this.adminService.create(dto.value);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.admins.update)
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: IKafkaMessage<UpdateAdminType>): Promise<UpdateResult> {
    return this.adminService.edit(payload.value);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.admins.delete)
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() email: IKafkaMessage<string>): Promise<DeleteResult> {
    return this.adminService.delete(email.value);
  }
  @MessagePattern({ cmd: UPDATE_ADMIN_WITHOUT_PASSWORD_AND_STATUS })
  @UseFilters(new ExceptionFilter())
  async updateAdmninWithoutPasswordAndStatus(@Payload() payload: UpdateAdminPayload): Promise<UpdateResult> {
    return this.adminService.updateProfileWithoutPasswordAndStatus(payload);
  }

}
