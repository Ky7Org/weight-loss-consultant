import {Get, Injectable} from "@nestjs/common";
import {TrainerRepository} from "../repositories/trainer.repository";
import {AdminRepository} from "../repositories/admin.repository";
import {PaginationDto} from "../dtos/pagination/pagination.dto";
import {PaginatedResultDto} from "../dtos/pagination/paginated-result.dto";
import {CustomerRepository} from "../repositories/customer.repository";
import {Gender} from "../constants/enums";



@Injectable()
export class SortingAndFilteringService {
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

  switchGenderForAdmin = async (genderFilter, sortBy, order, skipped, limit, page): Promise<PaginatedResultDto> => {
    switch (genderFilter) {
      case "" : {
        const totalCount = await this.adminRepository.count()
        const result = await this.adminRepository.createQueryBuilder()
          .orderBy(sortBy, order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(limit)
          .getMany()
        const res = await this.mappingResultPaginate(totalCount, page, limit, result);
        return res;
        break;
      }
      default: {
        const result = await this.adminRepository.createQueryBuilder("admin")
          .where("admin.gender = :gender", {gender: genderFilter === "1" ? Gender.MALE : Gender.FEMALE})
          .orderBy(sortBy, order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(limit)
          .getMany()
        const totalCount = await this.adminRepository.createQueryBuilder("admin")
          .where("admin.gender = :gender", {gender: genderFilter === "1" ? Gender.MALE : Gender.FEMALE})
          .getCount();
        const res = await this.mappingResultPaginate(totalCount, page, limit, result);
        return res;
        break;
      }
    }
  }

  switchGenderForTrainer = async (genderFilter, sortBy, order, skipped, limit, page): Promise<PaginatedResultDto> => {
    switch (genderFilter) {
      case "" : {
        const totalCount = await this.trainerRepository.count()
        const result = await this.trainerRepository.createQueryBuilder("trainer")
          .leftJoinAndSelect("trainer.packages", "package")
          .orderBy(sortBy, order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(limit)
          .getMany()
        const res = await this.mappingResultPaginate(totalCount, page, limit, result);
        return res;
        break;
      }
      default: {
        const result = await this.trainerRepository.createQueryBuilder("trainer")
          .leftJoinAndSelect("trainer.packages", "package")
          .where("trainer.gender = :gender", {gender: genderFilter === "1" ? Gender.MALE : Gender.FEMALE})
          .orderBy(sortBy, order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(limit)
          .getMany()
        const totalCount = await this.trainerRepository.createQueryBuilder("trainer")
          .where("trainer.gender = :gender", {gender: genderFilter === "1" ? Gender.MALE : Gender.FEMALE})
          .leftJoinAndSelect("trainer.packages", "package")
          .getCount();
        const res = await this.mappingResultPaginate(totalCount, page, limit, result);
        return res;
        break;
      }
    }
  }

  switchGenderForCustomer = async (genderFilter, sortBy, order, skipped, limit, page): Promise<PaginatedResultDto> => {
    switch (genderFilter) {
      case "" : {
        const totalCount = await this.customerRepository.count()
        const result = await this.customerRepository.createQueryBuilder("customer")
          .leftJoinAndSelect("customer.campaigns", "campaign")
          .orderBy(sortBy, order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(limit)
          .getMany()
        const res = await this.mappingResultPaginate(totalCount, page, limit, result);
        return res;
        break;
      }
      default: {
        const result = await this.customerRepository.createQueryBuilder("customer")
          .where("gender = :gender", {gender: genderFilter === "1" ? Gender.MALE : Gender.FEMALE})
          .leftJoinAndSelect("customer.campaigns", "campaign")
          .orderBy(sortBy, order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(limit)
          .getMany()
        const totalCount = await this.customerRepository.createQueryBuilder("customer")
          .where("customer.gender = :gender", {gender: genderFilter === "1" ? Gender.MALE : Gender.FEMALE})
          .leftJoinAndSelect("customer.campaigns", "campaign")
          .getCount();
        const res = await this.mappingResultPaginate(totalCount, page, limit, result);
        return res;
        break;
      }
    }
  }

  async sortingAndFiltering(payload: PaginationDto): Promise<PaginatedResultDto> {

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
          const result = await this.switchGenderForAdmin(genderFilter, sortBy, order, skipped, limit, page);
          return result;
          break;
        }

        case 'trainer': {
          const result = await this.switchGenderForTrainer(genderFilter, sortBy, order, skipped, limit, page);
          return result;
          break;
        }
        case 'customer': {
          const result = await this.switchGenderForCustomer(genderFilter, sortBy, order, skipped, limit, page);
          return result;
          break;
        }
      }
    }
  }
}
