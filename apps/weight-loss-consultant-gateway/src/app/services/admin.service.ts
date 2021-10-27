import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {Client, ClientKafka, ClientProxy} from '@nestjs/microservices';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { UpdateAdminDto } from '../dtos/admin/update-admin.dto';
import { CreateAdminDto } from '../dtos/admin/create-admin.dto';
import {PaginationDto} from "../dtos/pagination/pagination.dto";
import {
  KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN,
  KAFKA_USERS_MANAGEMENT_SERVICE,
} from "../../../../common/kafka-utils";
import {lastValueFrom} from "rxjs";

@Injectable()
export class AdminService implements OnModuleInit, OnModuleDestroy {

  @Client(KAFKA_USERS_MANAGEMENT_SERVICE)
  private readonly client: ClientKafka;

  async onModuleInit() {
    for (const [key, value] of Object.entries(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN)) {
      this.client.subscribeToResponseOf(value);
    }
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  getAllAdmins(payload: PaginationDto): Promise<AdminEntity[]> {
    return lastValueFrom(this.client
      .send(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.getAllAdmins, payload));
  }

  async getByEmail(email: string): Promise<AdminEntity> {
    return lastValueFrom(this.client
      .send(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.getByEmail, email));
  }

  async update(email: string, dto: UpdateAdminDto): Promise<UpdateResult> {
    return lastValueFrom(this.client
      .send(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.update, {email, dto}));
  }

  async delete(email: string): Promise<DeleteResult> {
    return lastValueFrom(this.client
      .send(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.delete, email));
  }

  async create(dto: CreateAdminDto): Promise<AdminEntity> {
    return lastValueFrom(this.client
      .send(KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN.create, dto));
  }
}

