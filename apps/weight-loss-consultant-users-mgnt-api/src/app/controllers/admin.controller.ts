import { Controller, UseFilters } from '@nestjs/common';
import { AdminService } from '../services/impl/admin.service.impl';
import { CreateAdminDto } from '../dtos/admin/create-admin.dto';
import { UpdateAdminDto } from '../dtos/admin/update-admin.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AdminEntity } from '../entities/admin.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import {PaginationDto} from "../dtos/pagination/pagination.dto";
import {PaginatedResultDto} from "../dtos/pagination/paginated-result.dto";
import {KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN} from "../../../../common/kafka-utils";
import {IKafkaMessage} from "../../../../common/kafka-message.model";

export type UpdateAdminType = {
  email: string;
  dto: UpdateAdminDto;
};

@Controller()
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
    return this.adminService.viewDetail(email.value);
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
}
