import { PaginationDto } from '../../weight-loss-consultant-users-mgnt-api/src/app/dtos/pagination/pagination.dto';

export type SearchPaginationPayloadType = {
  pagination: PaginationDto,
  search: string,
}
