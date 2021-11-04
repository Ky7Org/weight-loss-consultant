import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PaginatedResultDto } from '../../dtos/pagination/paginated-result.dto';
import { PaginationDto } from '../../dtos/pagination/pagination.dto';
import {
  ResponseUpdateStatus,
  UpdatePasswordPayload,
  UpdateStatusPayload
} from '../../../../../common/dtos/update-without-password-and-status.payload';
import { UpdateDeviceIDPayload } from '../../../../../common/dtos/update-trainer-dto.payload';
import { KAFKA_SEARCH_USERS_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../../common/kafka-utils';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SearchService implements OnModuleInit, OnModuleDestroy {

  @Inject('SERVER')
  private client: ClientKafka;

  async onModuleInit() {
    for (const [key, value] of Object.entries(MESSAGE_PATTERN)) {
      this.client.subscribeToResponseOf(value);
    }
    this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async search(pagination: PaginationDto, search: string): Promise<PaginatedResultDto> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.search, {pagination, search}));
  }

  async updatePassword(payload: UpdatePasswordPayload) : Promise<UpdatePasswordPayload> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.updatePassword, payload));
  }

  async updateStatus(payload: UpdateStatusPayload) : Promise<ResponseUpdateStatus>{
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.updateStatus, payload));
  }

  async updateDeviceID(payload: UpdateDeviceIDPayload) : Promise<boolean> {
    return lastValueFrom(this.client.send(MESSAGE_PATTERN.updateDeviceID, payload));
  }
}
