import {Injectable} from "@nestjs/common";
import {TrainerRepository} from "../repositories/trainer.repository";
import {AdminRepository} from "../repositories/admin.repository";
import {CustomerRepository} from "../repositories/customer.repository";
import {PaginatedResultDto} from '../dtos/pagination/paginated-result.dto';
import {PaginationDto} from '../dtos/pagination/pagination.dto';
import {AccountStatus, Gender} from '../constants/enums';


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

  switchGenderForAdmin = async (payload : PaginationDto, skipped: number): Promise<PaginatedResultDto> => {
    switch (payload.searchValue) {
      //search value empty => search all
      case "" : {
        const totalCount = await this.adminRepository.createQueryBuilder("admin")
          .where("(admin.gender like :gender) AND (admin.status like :status)",
            {
              gender : `%${payload.genderFilter}%`,
              status: `%${payload.status}%`
            })
          .getCount();
        const result = await this.adminRepository.createQueryBuilder("admin")
          .where("(admin.gender like :gender) AND (admin.status like :status)",
            {
              gender : `%${payload.genderFilter}%`,
              status: `%${payload.status}%`
            })
          .orderBy(payload.sortBy, payload.order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(payload.limit)
          .getMany()
        const res = await this.mappingResultPaginate(totalCount, payload.page, payload.limit, result);
        return res;
        break;
      }
      default: {
        const result = await this.adminRepository.createQueryBuilder("admin")
          //search by email
          .where("(admin.email like :email) " +
            "AND (admin.gender like :gender) " +
            "AND (admin.status like :status)",
            {
              email : `%${payload.searchValue}%`,
              gender: `%${payload.genderFilter}%`,
              status: `%${payload.status}%`
            })
          //search by fullname
          .orWhere("(admin.fullname like :fullname) " +
            "AND (admin.gender like :gender) " +
            "AND (admin.status like :status)",
            {
              fullname: `%${payload.searchValue}%`,
              gender: `%${payload.genderFilter}%`,
              status: `%${payload.status}%`
            })
          .orderBy(payload.sortBy, payload.order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(payload.limit)
          .getMany()
        const totalCount = await this.adminRepository.createQueryBuilder("admin")
          //search by email
          .where("(admin.email like :email)" +
            " AND (admin.gender like :gender)" +
            " AND (admin.status like :status)",
            {
              email : `%${payload.searchValue}%`,
              gender: `%${payload.genderFilter}%`,
              status: `%${payload.status}%`
            })
          //search by fullname
          .orWhere("(admin.fullname like :fullname)" +
            " AND (admin.gender like :gender)" +
            " AND (admin.status like :status)",
            {
              gender: `%${payload.genderFilter}%`,
              fullname: `%${payload.searchValue}%`,
              status: `%${payload.status}%`
            })
          .getCount();
        const res = await this.mappingResultPaginate(totalCount, payload.page, payload.limit, result);
        return res;
        break;
      }
    }
  }

  switchGenderForTrainer = async (payload: PaginationDto, skipped: number): Promise<PaginatedResultDto> => {
    switch (payload.searchValue) {
      //searchValue is empty => search all
      case "" : {
        const totalCount = await this.trainerRepository.createQueryBuilder("trainer")
          .where("(trainer.gender like :gender) " +
            "AND (trainer.status like :status) " +
            "AND (trainer.rating like :rating) " +
            "AND (trainer.yearOfExp like :yearOfExp)",
            {
              gender : `%${payload.genderFilter}%`,
              status: `%${payload.status}%`,
              rating: `%${payload.rating}%`,
              yearOfExp: `%${payload.yearOfExp}%`,
            })
          .getCount();
        const result = await this.trainerRepository.createQueryBuilder("trainer")
          .where("(trainer.gender like :gender) " +
            "AND (trainer.status like :status) " +
            "AND (trainer.rating like :rating) " +
            "AND (trainer.yearOfExp like :yearOfExp)",
            {
              gender : `%${payload.genderFilter}%`,
              status: `%${payload.status}%`,
              rating: `%${payload.rating}%`,
              yearOfExp: `%${payload.yearOfExp}%`,
            })
          .leftJoinAndSelect("trainer.packages", "package")
          .orderBy(payload.sortBy, payload.order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(payload.limit)
          .getMany()
        const res = await this.mappingResultPaginate(totalCount, payload.page, payload.limit, result);
        return res;
        break;
      }
      default: {
        const result = await this.trainerRepository.createQueryBuilder("trainer")
          .where("(trainer.email like :email) " +
            "AND (trainer.gender like :gender) " +
            "AND (trainer.status like :status) " +
            "AND (trainer.rating like :rating) " +
            "AND (trainer.yearOfExp like :yearOfExp)",
            {
              gender: `%${payload.genderFilter}%`,
              email : `%${payload.searchValue}%`,
              status: `%${payload.status}%`,
              rating: `%${payload.rating}%`,
              yearOfExp: `%${payload.yearOfExp}%`
            })
          //search by fullname
          .orWhere("(trainer.fullname like :fullname) " +
            "AND (trainer.gender = :gender) " +
            "AND (trainer.status = :status) " +
            "AND (trainer.rating like :rating) " +
            "AND (trainer.yearOfExp like :yearOfExp)",
            {
              gender: `%${payload.genderFilter}%`,
              fullname: `%${payload.searchValue}%`,
              status: `%${payload.status}%`,
              rating: `%${payload.rating}%`,
              yearOfExp: `%${payload.yearOfExp}%`
            })
          .leftJoinAndSelect("trainer.packages", "package")
          .orderBy(payload.sortBy, payload.order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(payload.limit)
          .getMany()
        const totalCount = await this.trainerRepository.createQueryBuilder("trainer")
          .leftJoinAndSelect("trainer.packages", "package")
          .where("(trainer.email like :email) " +
            "AND (trainer.gender like :gender) " +
            "AND (trainer.status like :status) " +
            "AND (trainer.rating like :rating) " +
            "AND (trainer.yearOfExp like :yearOfExp)",
            {
              gender: `%${payload.genderFilter}%`,
              email : `%${payload.searchValue}%`,
              status: `%${payload.status}%`,
              rating: `%${payload.rating}%`,
              yearOfExp: `%${payload.yearOfExp}%`
            })
          //search by fullname
          .orWhere("(trainer.fullname like :fullname) " +
            "AND (trainer.gender = :gender) " +
            "AND (trainer.status = :status) " +
            "AND (trainer.rating like :rating) " +
            "AND (trainer.yearOfExp like :yearOfExp)",
            {
              gender: `%${payload.genderFilter}%`,
              fullname: `%${payload.searchValue}%`,
              status: `%${payload.status}%`,
              rating: `%${payload.rating}%`,
              yearOfExp: `%${payload.yearOfExp}%`
            })
          .getCount();
        const res = await this.mappingResultPaginate(totalCount, payload.page, payload.limit, result);
        return res;
        break;
      }
    }
  }

  switchGenderForCustomer = async (payload: PaginationDto, skipped: number): Promise<PaginatedResultDto> => {
    switch (payload.searchValue) {
      case "" : {
        const totalCount = await this.customerRepository.createQueryBuilder("customer")
          .where("(customer.gender like :gender) " +
            "AND (customer.status like :status) ",
            {
              gender : `%${payload.genderFilter}%`,
              status: `%${payload.status}%`,
            })
          .getCount();
        const result = await this.customerRepository.createQueryBuilder("customer")
          .where("(customer.gender like :gender) " +
            "AND (customer.status like :status) ",
            {
              gender : `%${payload.genderFilter}%`,
              status: `%${payload.status}%`,
            })
          .leftJoinAndSelect("customer.campaigns", "campaign")
          .orderBy(payload.sortBy, payload.order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(payload.limit)
          .getMany()
        const res = await this.mappingResultPaginate(totalCount, payload.page, payload.limit, result);
        return res;
        break;
      }
      default: {
        const result = await this.customerRepository.createQueryBuilder("customer")
          //search by email
          .where("(customer.email like :email) " +
            "AND (customer.gender like :gender) " +
            "AND (customer.status like :status)",
            {
              gender: `%${payload.genderFilter}%`,
              email : `%${payload.searchValue}%`,
              status: `%${payload.status}%`
            })
          //search by fullname
          .orWhere("(customer.fullname like :fullname)" +
            " AND (customer.gender like :gender)" +
            " AND (customer.status like :status)",
            {
              gender: `%${payload.genderFilter}%`,
              fullname: `%${payload.searchValue}%`,
              status: `%${payload.status}%`
            })
          .leftJoinAndSelect("customer.campaigns", "campaign")
          .orderBy(payload.sortBy, payload.order === "ASC" ? "ASC" : "DESC")
          .offset(skipped)
          .limit(payload.limit)
          .getMany()
        const totalCount = await this.customerRepository.createQueryBuilder("customer")
          //search by email
          .where("(customer.email like :email) " +
            "AND (customer.gender like :gender) " +
            "AND (customer.status like :status)",
            {
              gender: `%${payload.genderFilter}%`,
              email : `%${payload.searchValue}%`,
              status: `%${payload.status}%`
            })
          //search by fullname
          .orWhere("(customer.fullname like :fullname)" +
            " AND (customer.gender like :gender)" +
            " AND (customer.status like :status)",
            {
              gender: `%${payload.genderFilter}%`,
              fullname: `%${payload.searchValue}%`,
              status: `%${payload.status}%`
            })
          .leftJoinAndSelect("customer.campaigns", "campaign")
          .getCount();
        const res = await this.mappingResultPaginate(totalCount, payload.page, payload.limit, result);
        return res;
        break;
      }
    }
  }

  async sortingAndFiltering(payload: PaginationDto): Promise<PaginatedResultDto> {

    if (payload) {

      if (payload.page && payload.page === 0) {
        payload.page += 1
      }

      const skipped = (payload.page - 1) * payload.limit;

      switch (payload.roleFilter) {
        case 'admin': {
          const result = await this.switchGenderForAdmin(payload, skipped);
          return result;
          break;
        }

        case 'trainer': {
          const result = await this.switchGenderForTrainer(payload, skipped);
          return result;
          break;
        }
        case 'customer': {
          const result = await this.switchGenderForCustomer(payload, skipped);
          return result;
          break;
        }
      }
    }
  }
}
