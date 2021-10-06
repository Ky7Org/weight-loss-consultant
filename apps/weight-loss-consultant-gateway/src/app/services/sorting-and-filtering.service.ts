import { Inject, Injectable } from '@nestjs/common';
import { USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/pagination/pagination.dto';
import { PaginatedResultDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/pagination/paginated-result.dto';
import { SORTING_AND_FILTERING_USERS } from '../../../../common/routes/users-management-service-routes';

@Injectable()
export class SortingAndFilteringService {
  constructor(@Inject(USERS_MANAGEMENT_SERVICE_NAME) private readonly usersManagementProxy: ClientProxy) {}

  async sortingAndFiltering(payload: PaginationDto): Promise<PaginatedResultDto> {
    return this.usersManagementProxy.send<PaginatedResultDto, PaginationDto>
    ({cmd: SORTING_AND_FILTERING_USERS}, payload).toPromise();
  }
}
