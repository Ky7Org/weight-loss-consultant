import { Inject, Injectable } from '@nestjs/common';
import { USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/pagination/pagination.dto';
import { PaginatedResultDto } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/dtos/pagination/paginated-result.dto';
import { SEARCH_USERS } from '../../../../common/routes/users-management-service-routes';
import { SearchPaginationPayloadType } from '../../../../common/dtos/search-pagination-dto.payload';

@Injectable()
export class SearchService {
  constructor(@Inject(USERS_MANAGEMENT_SERVICE_NAME) private readonly usersManagementProxy: ClientProxy) {}

  async search(pagination: PaginationDto, search: string): Promise<PaginatedResultDto> {
    return this.usersManagementProxy.send<PaginatedResultDto, SearchPaginationPayloadType>
    ({cmd: SEARCH_USERS}, {pagination, search}).toPromise();
  }
}
