import { Controller, UseGuards } from '@nestjs/common';
import {AdminService} from "../services/impl/admin.service.impl"
import {CreateAdminDto} from "../dtos/admin/create-admin.dto";
import {UpdateAdminDto} from "../dtos/admin/update-admin.dto";
import {MessagePattern, Payload} from "@nestjs/microservices";
import {GET_ALL_ADMINS, GET_ADMIN_BY_EMAIL, CREATE_ADMIN, UPDATE_ADMIN, DELETE_ADMIN} from "../../../../users-management-service-routes";
import {AdminEntity} from "../entities/admin.entity";
import {DeleteResult, UpdateResult} from "typeorm";
import { FirebaseAuthGuard } from '../guards/firebase-auth.guard';

type UpdateAdminType = {
  email: string;
  dto: UpdateAdminDto;
};

@Controller()
export class AdminController {

  constructor(private readonly userService: AdminService) {}

  @MessagePattern({cmd: GET_ALL_ADMINS})
  @UseGuards(FirebaseAuthGuard)
  async index(): Promise<AdminEntity[]> {
    try {
      return this.userService.findAll();
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  @MessagePattern({cmd: GET_ADMIN_BY_EMAIL})
  async getByEmail(@Payload() email: string): Promise<AdminEntity> {
    try {
      return this.userService.viewDetail(email);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  @MessagePattern({cmd: CREATE_ADMIN})
  async create(@Payload() dto: CreateAdminDto): Promise<AdminEntity> {
    try {
      return this.userService.create(dto);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  @MessagePattern({cmd: UPDATE_ADMIN})
  async update(@Payload() payload: UpdateAdminType): Promise<UpdateResult> {
    try {
      return this.userService.edit(payload.dto);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  @MessagePattern({cmd: DELETE_ADMIN})
  async delete(@Payload() email): Promise<DeleteResult> {
    try {
      return this.userService.delete(email);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

}
