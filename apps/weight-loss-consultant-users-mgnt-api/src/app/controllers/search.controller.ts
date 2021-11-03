import { ClassSerializerInterceptor, Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { SearchService } from '../services/search.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchPaginationPayloadType } from '../../../../common/dtos/search-pagination-dto.payload';
import {
  SEARCH_USERS,
  UPDATE_DEVICE_ID,
  UPDATE_PASSWORD,
  UPDATE_STATUS
} from '../../../../common/routes/users-management-service-routes';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';
import {
  UpdatePasswordPayload,
  UpdateStatusPayload
} from "../../../../common/dtos/update-without-password-and-status.payload";
import {UpdateDeviceIDPayload} from "../../../../common/dtos/update-trainer-dto.payload";
import { IKafkaMessage } from '../../../../common/kafka-message.model';


@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class SearchController {

  constructor(private readonly service: SearchService) {
  }

  @MessagePattern({cmd: SEARCH_USERS})
  @UseFilters(new ExceptionFilter())
  async search(@Payload() payload: IKafkaMessage<SearchPaginationPayloadType>) {
    return this.service.search(payload.value.pagination, payload.value.search);
  }

  @MessagePattern({cmd: UPDATE_PASSWORD})
  @UseFilters(new ExceptionFilter())
  async updatePassword(@Payload() payload: IKafkaMessage<UpdatePasswordPayload>) {
    return this.service.updatePassword(payload.value);
  }

  @MessagePattern({cmd: UPDATE_STATUS})
  @UseFilters(new ExceptionFilter())
  async updateStatus(@Payload() payload: IKafkaMessage<UpdateStatusPayload>) {
    return this.service.updateStatus(payload.value);
  }

  @MessagePattern({cmd: UPDATE_DEVICE_ID})
  @UseFilters(new ExceptionFilter())
  async updateDeviceID(@Payload() payload: IKafkaMessage<UpdateDeviceIDPayload>) {
    return this.service.updateDeviceID(payload.value);
  }

}
