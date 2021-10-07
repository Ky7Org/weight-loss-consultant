import { Injectable } from '@nestjs/common';
import { TrainerRepository } from '../repositories/trainer.repository';
import { AdminRepository } from '../repositories/admin.repository';
import { PaginationDto } from '../dtos/pagination/pagination.dto';
import { PaginatedResultDto } from '../dtos/pagination/paginated-result.dto';
import { CustomerRepository } from '../repositories/customer.repository';



@Injectable()
export class SearchService {
  constructor(
    private adminRepository: AdminRepository,
    private trainerRepository: TrainerRepository,
    private customerRepository: CustomerRepository
  ) {
  }

  mappingResultPaginate = async (totalCount, page, limit, result) => {
    const res = new PaginatedResultDto();
    res.totalCount = totalCount;
    res.page = page;
    res.limit = limit;
    res.data = result;
    return res;
  }

  async search(payload: PaginationDto, search: string): Promise<PaginatedResultDto> {
    if (payload) {
      const roleFilter: string = payload.roleFilter;
      const genderFilter: string = payload.genderFilter;
      const order: string = payload.order;
      const sortBy: string = payload.sortBy;
      let page: number = payload.page;
      const limit: number = payload.limit;
      const res = new PaginatedResultDto();

      if (page === 0) {
        page += 1
      }

      const skipped = (page - 1) * limit;

      switch (roleFilter) {
        case 'admin': {
          const result = await this.searchAndPaginateForAdmin(search, skipped, limit, page);
          return result;
          break;
        }
        case 'trainer': {
          const result = await this.searchAndPaginateForTrainer(search, skipped, limit, page);
          return result;
          break;
        }
        case 'customer': {
          const result = await this.searchAndPaginateForCustomer(search, skipped, limit, page);
          return result;
          break;
        }
      }
    }
  }

  searchAndPaginateForAdmin = async (searchValue : string, skipped: number, limit: number, page: number) => {
    const query = await this.adminRepository.createQueryBuilder("admin")
      .where("admin.fullname like :fullname", {fullname : `%${searchValue}%`})
      .orWhere("admin.email like :email", {email: `%${searchValue}%`})
      .offset(skipped)
      .limit(limit)
      .getMany();
    const totalCount = await this.adminRepository.createQueryBuilder("admin")
      .where("admin.fullname like :fullname", {fullname : `%${searchValue}%`})
      .orWhere("admin.email like :email", {email: `%${searchValue}%`})
      .getCount();
    const res = await this.mappingResultPaginate(totalCount, page, limit, query);
    return res;
  }

  searchAndPaginateForTrainer = async (searchValue : string, skipped: number, limit: number, page: number) => {
    const query = await this.trainerRepository.createQueryBuilder("trainer")
      .where("trainer.fullname like :fullname", {fullname : `%${searchValue}%`})
      .orWhere("trainer.email like :email", {email: `%${searchValue}%`})
      .leftJoinAndSelect("trainer.packages" , "package")
      .offset(skipped)
      .limit(limit)
      .getMany();
    const totalCount = await this.trainerRepository.createQueryBuilder("trainer")
      .where("trainer.fullname like :fullname", {fullname : `%${searchValue}%`})
      .orWhere("trainer.email like :email", {email: `%${searchValue}%`})
      .leftJoinAndSelect("trainer.packages" , "package")
      .getCount();
    const res = await this.mappingResultPaginate(totalCount, page, limit, query);
    return res;
  }

  searchAndPaginateForCustomer = async (searchValue : string, skipped: number, limit: number, page: number) => {
    const query = await this.customerRepository.createQueryBuilder("customer")
      .where("customer.fullname like :fullname", {fullname : `%${searchValue}%`})
      .orWhere("customer.email like :email", {email: `%${searchValue}%`})
      .leftJoinAndSelect("customer.campaigns" , "campaign")
      .offset(skipped)
      .limit(limit)
      .getMany();
    const totalCount = await this.customerRepository.createQueryBuilder("customer")
      .where("customer.fullname like :fullname", {fullname : `%${searchValue}%`})
      .orWhere("customer.email like :email", {email: `%${searchValue}%`})
      .leftJoinAndSelect("customer.campaigns" , "campaign")
      .getCount();
    const res = await this.mappingResultPaginate(totalCount, page, limit, query);
    return res;
  }
}
