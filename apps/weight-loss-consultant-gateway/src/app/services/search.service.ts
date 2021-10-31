import {Inject, Injectable} from '@nestjs/common';
import {USERS_MANAGEMENT_SERVICE_NAME} from '../../../../../constant';
import {ClientProxy} from '@nestjs/microservices';
import {SEARCH_USERS, UPDATE_PASSWORD, UPDATE_STATUS} from '../../../../common/routes/users-management-service-routes';
import {SearchPaginationPayloadType} from '../../../../common/dtos/search-pagination-dto.payload';
import {PaginatedResultDto} from '../dtos/pagination/paginated-result.dto';
import {PaginationDto} from '../dtos/pagination/pagination.dto';
import {
  ResponseUpdateStatus,
  UpdatePasswordPayload,
  UpdateStatusPayload
} from "../../../../common/dtos/update-without-password-and-status.payload";

@Injectable()
export class SearchService {
  constructor(@Inject(USERS_MANAGEMENT_SERVICE_NAME) private readonly usersManagementProxy: ClientProxy) {}

  async search(pagination: PaginationDto, search: string): Promise<PaginatedResultDto> {
    return this.usersManagementProxy.send<PaginatedResultDto, SearchPaginationPayloadType>
    ({cmd: SEARCH_USERS}, {pagination, search}).toPromise();
  }

  async updatePassword(payload: UpdatePasswordPayload) : Promise<UpdatePasswordPayload> {
    const pattern = {cmd: UPDATE_PASSWORD};
    return this.usersManagementProxy.send<UpdatePasswordPayload>(pattern, payload).toPromise();
  }

  async updateStatus(payload: UpdateStatusPayload) : Promise<ResponseUpdateStatus>{
    const pattern = {cmd: UPDATE_STATUS};
    return this.usersManagementProxy.send<UpdateStatusPayload>(pattern, payload).toPromise();
  }
}
