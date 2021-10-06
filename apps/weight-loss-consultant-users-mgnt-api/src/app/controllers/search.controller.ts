import { Body, Controller, Logger, Post, Query, Res, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { SearchService } from '../services/search.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchPaginationPayloadType } from '../../../../common/dtos/search-pagination-dto.payload';
import { SEARCH_USERS, SORTING_AND_FILTERING_USERS } from '../../../../users-management-service-routes';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';


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
