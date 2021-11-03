import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {USERS_MANAGEMENT_SERVICE_NAME} from '../../../../../../constant';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import {
  SEARCH_USERS,
  UPDATE_DEVICE_ID,
  UPDATE_PASSWORD,
  UPDATE_STATUS
} from '../../../../../common/routes/users-management-service-routes';
import {SearchPaginationPayloadType} from '../../../../../common/dtos/search-pagination-dto.payload';
import {PaginatedResultDto} from '../../dtos/pagination/paginated-result.dto';
import {PaginationDto} from '../../dtos/pagination/pagination.dto';
import {
  ResponseUpdateStatus,
  UpdatePasswordPayload,
  UpdateStatusPayload
} from "../../../../../common/dtos/update-without-password-and-status.payload";
import {UpdateDeviceIDPayload} from "../../../../../common/dtos/update-trainer-dto.payload";
import { KAFKA_AUTHENTICATION_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../../common/kafka-utils';

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
    return this.client.send<PaginatedResultDto, SearchPaginationPayloadType>
    ({cmd: SEARCH_USERS}, {pagination, search}).toPromise();
  }

  async updatePassword(payload: UpdatePasswordPayload) : Promise<UpdatePasswordPayload> {
    const pattern = {cmd: UPDATE_PASSWORD};
    return this.client.send<UpdatePasswordPayload>(pattern, payload).toPromise();
  }

  async updateStatus(payload: UpdateStatusPayload) : Promise<ResponseUpdateStatus>{
    const pattern = {cmd: UPDATE_STATUS};
    return this.client.send<UpdateStatusPayload>(pattern, payload).toPromise();
  }

  async updateDeviceID(payload: UpdateDeviceIDPayload) : Promise<boolean> {
    const pattern = {cmd: UPDATE_DEVICE_ID};
    return this.client.send(pattern, payload).toPromise();
  }
}
