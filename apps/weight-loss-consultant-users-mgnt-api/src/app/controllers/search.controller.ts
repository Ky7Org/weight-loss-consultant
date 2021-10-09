import {Controller, UseFilters} from '@nestjs/common';
import {SearchService} from '../services/search.service';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {SearchPaginationPayloadType} from '../../../../common/dtos/search-pagination-dto.payload';
import {SEARCH_USERS} from '../../../../common/routes/users-management-service-routes';
import {ExceptionFilter} from '../../../../common/filters/rpc-exception.filter';


@Controller()
export class SearchController {
  constructor(private readonly service: SearchService) {
  }

  @MessagePattern({cmd: SEARCH_USERS})
  @UseFilters(new ExceptionFilter())
  async search(@Payload() payload: SearchPaginationPayloadType){
    return this.service.search(payload.pagination, payload.search);
  }
}
