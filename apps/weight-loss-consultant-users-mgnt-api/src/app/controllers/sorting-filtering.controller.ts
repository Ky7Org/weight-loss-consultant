import { Controller, UseFilters } from '@nestjs/common';
import { SortingAndFilteringService } from '../services/sorting-filtering.service';
import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SORTING_AND_FILTERING_USERS } from '../../../../common/routes/users-management-service-routes';
import { ExceptionFilter } from '../../../../common/filters/rpc-exception.filter';


@Controller()
export class SortingAndFilteringController {

  constructor(private readonly service: SortingAndFilteringService) {
  }

  @MessagePattern({cmd: SORTING_AND_FILTERING_USERS})
  @UseFilters(new ExceptionFilter())
  async sortAndFilter(@Payload() payload: PaginationDto) {
    return this.service.sortingAndFiltering(payload)
  }
}
