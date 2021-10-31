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
export class AdminController {

  constructor(private readonly adminService: AdminService,
              private readonly customerService: CustomerService,
              private readonly trainerService: TrainerService) {
  }

  @MessagePattern({ cmd: GET_ALL_ADMINS })
  @UseFilters(new ExceptionFilter())
  async index(@Payload() payload: PaginationDto): Promise<PaginatedResultDto> {
    return this.adminService.findAll(payload);
  }

  @MessagePattern({ cmd: ADMIN_VIEW_DETAIL })
  @UseFilters(new ExceptionFilter())
  async viewAdminDetailByUsername(@Payload() username: string): Promise<AdminEntity> {
    return this.adminService.viewDetail(username);
  }

  @MessagePattern({ cmd: CUSTOMER_VIEW_DETAIL })
  @UseFilters(new ExceptionFilter())
  async viewCustomerDetailByUsername(@Payload() username: string): Promise<CustomerEntity> {
    return this.customerService.findOneCustomer(username);
  }

  @MessagePattern({ cmd: TRAINER_VIEW_DETAIL })
  @UseFilters(new ExceptionFilter())
  async viewTrainerDetailByUsername(@Payload() username: string): Promise<TrainerEntity> {
    return this.trainerService.findOneTrainer(username);
  }

  @MessagePattern({ cmd: GET_ADMIN_BY_EMAIL })
  @UseFilters(new ExceptionFilter())
  async getByEmail(@Payload() email: string): Promise<AdminEntity> {
    return this.adminService.viewDetail(email);
  }

  @MessagePattern({ cmd: CREATE_ADMIN })
  @UseFilters(new ExceptionFilter())
  async create(@Payload() dto: CreateAdminDto): Promise<AdminEntity> {
    return this.adminService.create(dto);
  }

  @MessagePattern({ cmd: UPDATE_ADMIN })
  @UseFilters(new ExceptionFilter())
  async update(@Payload() payload: UpdateAdminType): Promise<UpdateResult> {
    return this.adminService.edit(payload);
  }

  @MessagePattern({ cmd: DELETE_ADMIN })
  @UseFilters(new ExceptionFilter())
  async delete(@Payload() email): Promise<DeleteResult> {
    return this.adminService.delete(email);
  }

  @MessagePattern({ cmd: UPDATE_ADMIN_WITHOUT_PASSWORD_AND_STATUS })
  @UseFilters(new ExceptionFilter())
  async updateAdmninWithoutPasswordAndStatus(@Payload() payload: UpdateAdminPayload): Promise<UpdateResult> {
    return this.adminService.updateProfileWithoutPasswordAndStatus(payload);
  }

}
