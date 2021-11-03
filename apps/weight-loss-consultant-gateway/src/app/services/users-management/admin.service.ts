import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {ClientKafka} from '@nestjs/microservices';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AdminEntity } from '../../entities/admin.entity';
import { UpdateAdminDto } from '../../dtos/admin/update-admin.dto';
import { CreateAdminDto } from '../../dtos/admin/create-admin.dto';
import {PaginationDto} from "../../dtos/pagination/pagination.dto";
import {UpdateAdminPayload} from "../../../../../common/dtos/update-without-password-and-status.payload";
import {KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN} from "../../../../../common/kafka-utils";
import {lastValueFrom} from "rxjs";

@Injectable()
export class AdminService implements OnModuleInit, OnModuleDestroy {

  @Inject('SERVER')
  private readonly client: ClientKafka;

  async onModuleInit() {
    for (const [key, value] of Object.entries(MESSAGE_PATTERN.admins)) {
      this.client.subscribeToResponseOf(value);
    }
    this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async getAllAdmins(payload: PaginationDto): Promise<AdminEntity[]> {
    return lastValueFrom<AdminEntity[]>(this.client.send(MESSAGE_PATTERN.admins.getAllAdmins, payload));
  }

  async getByEmail(email: string): Promise<AdminEntity> {
    return lastValueFrom<AdminEntity>(this.client.send(MESSAGE_PATTERN.admins.getByEmail, email));
  }

  async update(email: string, dto: UpdateAdminDto): Promise<UpdateResult> {
    return lastValueFrom<UpdateResult>(this.client.send(MESSAGE_PATTERN.admins.update, {email, dto}));
  }

  async updateWithoutPasswordAndStatus(payload: UpdateAdminPayload) : Promise<UpdateResult> {
    return lastValueFrom<UpdateResult>(this.client.send(MESSAGE_PATTERN.admins.updateProfileWithoutPasswordAndStatus, payload));
  }

  async delete(email: string): Promise<DeleteResult> {
    return lastValueFrom<UpdateResult>(this.client.send(MESSAGE_PATTERN.admins.delete, email));
  }

  async create(dto: CreateAdminDto): Promise<AdminEntity> {
    return lastValueFrom<AdminEntity>(this.client.send(MESSAGE_PATTERN.admins.create, dto));
  }
}

