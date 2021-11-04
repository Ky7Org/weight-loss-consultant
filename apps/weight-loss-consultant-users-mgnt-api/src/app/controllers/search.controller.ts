import { ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { SearchService } from '../services/search.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchPaginationPayloadType } from '../../../../common/dtos/search-pagination-dto.payload';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import {
  UpdatePasswordPayload,
  UpdateStatusPayload
} from '../../../../common/dtos/update-without-password-and-status.payload';
import { UpdateDeviceIDPayload } from '../../../../common/dtos/update-trainer-dto.payload';
import { IKafkaMessage } from '../../../../common/kafka-message.model';
import { KAFKA_SEARCH_USERS_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class SearchController {

  constructor(private readonly service: SearchService) {
  }

  @MessagePattern(MESSAGE_PATTERN.search)
  @UseFilters(new ExceptionFilter())
  async search(@Payload() payload: IKafkaMessage<SearchPaginationPayloadType>) {
    return this.service.search(payload.value.pagination, payload.value.search);
  }

  @MessagePattern(MESSAGE_PATTERN.updatePassword)
  @UseFilters(new ExceptionFilter())
  async updatePassword(@Payload() payload: IKafkaMessage<UpdatePasswordPayload>) {
    return this.service.updatePassword(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.updateStatus)
  @UseFilters(new ExceptionFilter())
  async updateStatus(@Payload() payload: IKafkaMessage<UpdateStatusPayload>) {
    return this.service.updateStatus(payload.value);
  }

  @MessagePattern(MESSAGE_PATTERN.updateDeviceID)
  @UseFilters(new ExceptionFilter())
  async updateDeviceID(@Payload() payload: IKafkaMessage<UpdateDeviceIDPayload>) {
    return this.service.updateDeviceID(payload.value);
  }

}
