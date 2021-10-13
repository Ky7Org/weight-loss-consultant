import {Injectable} from "@nestjs/common";
import {TrainerRepository} from "../repositories/trainer.repository";
import {AdminRepository} from "../repositories/admin.repository";
import {CustomerRepository} from "../repositories/customer.repository";
import {PaginatedResultDto} from '../dtos/pagination/paginated-result.dto';
import {PaginationDto} from '../dtos/pagination/pagination.dto';
import {Gender} from '../constants/enums';


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

  switchGenderForAdmin = async (searchValue, genderFilter, sortBy, order, skipped, limit, page): Promise<PaginatedResultDto> => {
    switch (genderFilter) {
      //gender is empty => search all
      case "" : {
        const totalCount = await this.adminRepository.createQueryBuilder("admin")
          .where("admin.fullname like :fullname", {fullname : `%${searchValue}%`})
          .orWhere("admin.email like :email", {email: `%${searchValue}%`})
          .getCount();
        const result = await this.adminRepository.createQueryBuilder("admin")
          .where("admin.fullname like :fullname", {fullname : `%${searchValue}%`})
          .orWhere("admin.email like :email", {email: `%${searchValue}%`})
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
          .andWhere("admin.fullname like :fullname", {fullname : `%${searchValue}%`})
          .orWhere("admin.email like :email", {email: `%${searchValue}%`})
          .orderBy(sortBy, order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(limit)
          .getMany()
        const totalCount = await this.adminRepository.createQueryBuilder("admin")
          .where("admin.gender = :gender", {gender: genderFilter === "1" ? Gender.MALE : Gender.FEMALE})
          .andWhere("admin.fullname like :fullname", {fullname : `%${searchValue}%`})
          .orWhere("admin.email like :email", {email: `%${searchValue}%`})
          .getCount();
        const res = await this.mappingResultPaginate(totalCount, page, limit, result);
        return res;
        break;
      }
    }
  }

  switchGenderForTrainer = async (searchValue, genderFilter, sortBy, order, skipped, limit, page): Promise<PaginatedResultDto> => {
    switch (genderFilter) {
      //gender is empty => search all
      case "" : {
        const totalCount = await this.trainerRepository.createQueryBuilder("trainer")
          .where("trainer.fullname like :fullname", {fullname : `%${searchValue}%`})
          .orWhere("trainer.email like :email", {email: `%${searchValue}%`})
          .getCount();
        const result = await this.trainerRepository.createQueryBuilder("trainer")
          .where("trainer.fullname like :fullname", {fullname : `%${searchValue}%`})
          .orWhere("trainer.email like :email", {email: `%${searchValue}%`})
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
          .andWhere("trainer.fullname like :fullname", {fullname : `%${searchValue}%`})
          .orWhere("trainer.email like :email", {email: `%${searchValue}%`})
          .orderBy(sortBy, order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(limit)
          .getMany()
        const totalCount = await this.trainerRepository.createQueryBuilder("trainer")
          .where("trainer.gender = :gender", {gender: genderFilter === "1" ? Gender.MALE : Gender.FEMALE})
          .andWhere("trainer.fullname like :fullname", {fullname : `%${searchValue}%`})
          .orWhere("trainer.email like :email", {email: `%${searchValue}%`})
          .leftJoinAndSelect("trainer.packages", "package")
          .getCount();
        const res = await this.mappingResultPaginate(totalCount, page, limit, result);
        return res;
        break;
      }
    }
  }

  switchGenderForCustomer = async (searchValue, genderFilter, sortBy, order, skipped, limit, page): Promise<PaginatedResultDto> => {
    switch (genderFilter) {
      case "" : {
        const totalCount = await this.customerRepository.createQueryBuilder("customer")
          .where("customer.fullname like :fullname", {fullname : `%${searchValue}%`})
          .orWhere("customer.email like :email", {email: `%${searchValue}%`})
          .getCount();
        const result = await this.customerRepository.createQueryBuilder("customer")
          .where("customer.fullname like :fullname", {fullname : `%${searchValue}%`})
          .orWhere("customer.email like :email", {email: `%${searchValue}%`})
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
          .where("customer.gender = :gender", {gender: genderFilter === "1" ? Gender.MALE : Gender.FEMALE})
          .andWhere("customer.fullname like :fullname", {fullname : `%${searchValue}%`})
          .orWhere("customer.email like :email", {email: `%${searchValue}%`})
          .leftJoinAndSelect("customer.campaigns", "campaign")
          .orderBy(sortBy, order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(limit)
          .getMany()
        const totalCount = await this.customerRepository.createQueryBuilder("customer")
          .where("customer.gender = :gender", {gender: genderFilter === "1" ? Gender.MALE : Gender.FEMALE})
          .andWhere("customer.fullname like :fullname", {fullname : `%${searchValue}%`})
          .orWhere("customer.email like :email", {email: `%${searchValue}%`})
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
      const searchValue : string = payload.searchValue;
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
          const result = await this.switchGenderForAdmin(searchValue, genderFilter, sortBy, order, skipped, limit, page);
          return result;
          break;
        }

        case 'trainer': {
          const result = await this.switchGenderForTrainer(searchValue, genderFilter, sortBy, order, skipped, limit, page);
          return result;
          break;
        }
        case 'customer': {
          const result = await this.switchGenderForCustomer(searchValue, genderFilter, sortBy, order, skipped, limit, page);
          return result;
          break;
        }
      }
    }
  }
}
