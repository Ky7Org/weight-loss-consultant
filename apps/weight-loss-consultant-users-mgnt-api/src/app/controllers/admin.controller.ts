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

export type UpdateAdminType = {
  email: string;
  dto: UpdateAdminDto;
};

@Controller()
export class AdminController {

  constructor(private readonly adminService: AdminService) {
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.getAllAdmins)
  @UseFilters(new ExceptionFilter())
  async index(@Payload() payload: PaginationDto): Promise<PaginatedResultDto> {
    return this.adminService.findAll(payload);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.getByEmail)
  @UseFilters(new ExceptionFilter())
  async getByEmail(@Payload() email: string): Promise<AdminEntity> {
    return this.adminService.viewDetail(email);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.create)
  @UseFilters(new ExceptionFilter())
  async create(@Payload() dto: CreateAdminDto): Promise<AdminEntity> {
    return this.adminService.create(dto);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.update)
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: UpdateAdminType): Promise<UpdateResult> {
    return this.adminService.edit(payload);
  }

  @MessagePattern(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.delete)
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() email): Promise<DeleteResult> {
    return this.adminService.delete(email);
  }
}
