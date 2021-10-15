import { Injectable } from '@nestjs/common';
import { TrainerRepository } from '../repositories/trainer.repository';
import { AdminRepository } from '../repositories/admin.repository';
import { CustomerRepository } from '../repositories/customer.repository';
import { PaginatedResultDto } from '../dtos/pagination/paginated-result.dto';
import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { Gender } from '../../../../common/constants/enums';
import { Injectable } from '@nestjs/common';
import { TrainerRepository } from '../repositories/trainer.repository';
import { AdminRepository } from '../repositories/admin.repository';
import { CustomerRepository } from '../repositories/customer.repository';
import { PaginatedResultDto } from '../dtos/pagination/paginated-result.dto';
import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { Gender } from '../constants/enums';
import { getManager } from 'typeorm';
import { combineLatest, map, Observable, of } from 'rxjs';

const COUNT_TABLE_ROW = `SELECT COUNT(email) FROM $1;`;
const getGenderEnumFromName = (genderFilter: string) => {
  return genderFilter === '1' ? Gender.MALE : Gender.FEMALE;
};
const getOrderDirection = (order: string) => {
  return order === 'ASC' ? 'ASC' : 'DESC';
};

@Injectable()
export class SortingAndFilteringService {
  constructor(
    private adminRepository: AdminRepository,
    private trainerRepository: TrainerRepository,
    private customerRepository: CustomerRepository
  ) {
  }

  static mappingResultPaginate(totalCount, page, limit, result): PaginatedResultDto {
    return {
      totalCount: totalCount,
      page: page,
      limit: limit,
      data: result
    } as PaginatedResultDto;
  };

  sortingAndFiltering(payload: PaginationDto): Observable<PaginatedResultDto> {
    let page: number = payload.page;
    if (page === 0) {
      page += 1;
    }
    const skipped = (page - 1) * payload.limit;
    const entityManager = getManager();
    console.log(JSON.stringify([payload.roleFilter, getGenderEnumFromName(payload.genderFilter),
      payload.searchValue, payload.searchValue, payload.sortBy,
      getOrderDirection(payload.order), payload.limit, skipped]));
    return combineLatest([entityManager.query(`SELECT * FROM ? WHERE gender = ? AND fullname LIKE '%?%' OR email LIKE '%?%' ORDER BY ? ? LIMIT ? OFFSET ?;`,
      [payload.roleFilter, getGenderEnumFromName(payload.genderFilter),
        payload.searchValue, payload.searchValue, payload.sortBy,
        getOrderDirection(payload.order), payload.limit, skipped]),
      entityManager.query(COUNT_TABLE_ROW, [payload.roleFilter])])
      .pipe(map(([result, totalCount]) => {
        return SortingAndFilteringService.mappingResultPaginate(totalCount,
          page, payload.limit, result);
      }));
  }
}
