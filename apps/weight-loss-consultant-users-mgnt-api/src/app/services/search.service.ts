import {HttpStatus, Injectable} from '@nestjs/common';
import {TrainerRepository} from '../repositories/trainer.repository';
import {AdminRepository} from '../repositories/admin.repository';
import {PaginationDto} from '../dtos/pagination/pagination.dto';
import {PaginatedResultDto} from '../dtos/pagination/paginated-result.dto';
import {CustomerRepository} from '../repositories/customer.repository';
import {
  ResponseUpdatePassword, ResponseUpdateStatus,
  UpdatePasswordPayload, UpdateStatusPayload
} from "../../../../common/dtos/update-without-password-and-status.payload";
import {UpdateResult} from "typeorm";
import {Role} from "../constants/enums";
import {AdminEntity} from "../entities/admin.entity";
import {TrainerEntity} from "../entities/trainer.entity";
import {CustomerEntity} from "../entities/customer.entity";
import * as bcrypt from "bcrypt";
import {RpcException} from "@nestjs/microservices";
import {RpcExceptionModel} from "../../../../common/filters/rpc-exception.model";


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

  searchAndPaginateForAdmin = async (searchValue: string, skipped: number, limit: number, page: number) => {
    const query = await this.adminRepository.createQueryBuilder("admin")
      .where("admin.fullname like :fullname", {fullname: `%${searchValue}%`})
      .orWhere("admin.email like :email", {email: `%${searchValue}%`})
      .offset(skipped)
      .limit(limit)
      .getMany();
    const totalCount = await this.adminRepository.createQueryBuilder("admin")
      .where("admin.fullname like :fullname", {fullname: `%${searchValue}%`})
      .orWhere("admin.email like :email", {email: `%${searchValue}%`})
      .getCount();
    const res = await this.mappingResultPaginate(totalCount, page, limit, query);
    return res;
  }

  searchAndPaginateForTrainer = async (searchValue: string, skipped: number, limit: number, page: number) => {
    const query = await this.trainerRepository.createQueryBuilder("trainer")
      .where("trainer.fullname like :fullname", {fullname: `%${searchValue}%`})
      .orWhere("trainer.email like :email", {email: `%${searchValue}%`})
      .leftJoinAndSelect("trainer.packages", "package")
      .offset(skipped)
      .limit(limit)
      .getMany();
    const totalCount = await this.trainerRepository.createQueryBuilder("trainer")
      .where("trainer.fullname like :fullname", {fullname: `%${searchValue}%`})
      .orWhere("trainer.email like :email", {email: `%${searchValue}%`})
      .leftJoinAndSelect("trainer.packages", "package")
      .getCount();
    const res = await this.mappingResultPaginate(totalCount, page, limit, query);
    return res;
  }

  searchAndPaginateForCustomer = async (searchValue: string, skipped: number, limit: number, page: number) => {
    const query = await this.customerRepository.createQueryBuilder("customer")
      .where("customer.fullname like :fullname", {fullname: `%${searchValue}%`})
      .orWhere("customer.email like :email", {email: `%${searchValue}%`})
      .leftJoinAndSelect("customer.campaigns", "campaign")
      .offset(skipped)
      .limit(limit)
      .getMany();
    const totalCount = await this.customerRepository.createQueryBuilder("customer")
      .where("customer.fullname like :fullname", {fullname: `%${searchValue}%`})
      .orWhere("customer.email like :email", {email: `%${searchValue}%`})
      .leftJoinAndSelect("customer.campaigns", "campaign")
      .getCount();
    const res = await this.mappingResultPaginate(totalCount, page, limit, query);
    return res;
  }

  private async checkEmailAdminExist(email: string): Promise<AdminEntity | null> {
    const result = this.adminRepository.createQueryBuilder("admin")
      .where("admin.email = :email", {email: email})
      .getOne();
    return result ? result : null;
  }

  private async checkEmailTrainerExist(email: string): Promise<TrainerEntity | null> {
    const result = this.trainerRepository.createQueryBuilder("trainer")
      .where("trainer.email = :email", {email: email})
      .getOne();
    return result ? result : null;
  }

  private async checkEmailCustomerExist(email: string): Promise<CustomerEntity> {
    const result = this.customerRepository.createQueryBuilder("customer")
      .where("customer.email = :email", {email: email})
      .getOne();
    return result ? result : null;
  }

  //check old password from payload matched with entity password
  private async checkOldPasswordAdmin(email: string, password: string): Promise<boolean> {
    const admin: AdminEntity = await this.checkEmailAdminExist(email);
    if (admin === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found admin with email: ${email}`
      } as RpcExceptionModel);
    }
    if (admin) {
      const result = await bcrypt.compare(password, admin.password)
      return result ? true : false;
    }
    return false;
  }

  private async checkOldPasswordCustomer(email: string, password: string): Promise<boolean> {
    const customer: CustomerEntity = await this.checkEmailCustomerExist(email);
    if (customer === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found customer with email: ${email}`
      } as RpcExceptionModel);
    }
    if (customer) {
      const result = await bcrypt.compare(password, customer.password)
      return result ? true : false;
    }
    return false;
  }

  private async checkOldPasswordTrainer(email: string, password: string): Promise<boolean> {
    const trainer: TrainerEntity = await this.checkEmailTrainerExist(email);
    if (trainer === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found trainer with email: ${email}`
      } as RpcExceptionModel);
    }
    if (trainer) {
      const result = await bcrypt.compare(password, trainer.password)
      return result ? true : false;
    }
    return false;
  }

  private async checkOldPasswordIsCorrect(payload: UpdatePasswordPayload): Promise<boolean> {
    if (payload) {
      switch (payload.role) {
        case Role.Admin: {
          const adminResult: boolean = await this.checkOldPasswordAdmin(payload.email, payload.oldPassword)
          return adminResult;
          break;
        }
        case Role.Trainer: {
          const trainerResult: boolean = await this.checkOldPasswordTrainer(payload.email, payload.oldPassword)
          return trainerResult;
          break;
        }
        case Role.Customer: {
          const custResult: boolean = await this.checkOldPasswordCustomer(payload.email, payload.oldPassword)
          return custResult;
          break;
        }
        default: {
          break;
        }
      }
    }
    return false;
  }

  private async updatePasswordAdmin(payload: UpdatePasswordPayload): Promise<ResponseUpdatePassword> {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(payload.newPassword, salt);
    const result = this.adminRepository.createQueryBuilder()
      .update(AdminEntity)
      .set({
        password: hashedPassword
      })
      .where("email = :email", {email: payload.email})
      .execute();
    if ((await result).affected === 1) {
      const result = {
        email: payload.email,
        newPassword: payload.newPassword
      } as ResponseUpdatePassword
      return result;
    }
    return null;
  }

  private async updatePasswordTrainer(payload: UpdatePasswordPayload): Promise<ResponseUpdatePassword> {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(payload.newPassword, salt);
    const result = this.trainerRepository.createQueryBuilder()
      .update(TrainerEntity)
      .set({
        password: hashedPassword
      })
      .where("email = :email", {email: payload.email})
      .execute();
    if ((await result).affected === 1) {
      const result = {
        email: payload.email,
        newPassword: payload.newPassword
      } as ResponseUpdatePassword
      return result;
    }
    return null;
  }

  private async updatePasswordCustomer(payload: UpdatePasswordPayload): Promise<ResponseUpdatePassword> {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(payload.newPassword, salt);
    const result = this.customerRepository.createQueryBuilder()
      .update(CustomerEntity)
      .set({
        password: hashedPassword
      })
      .where("email = :email", {email: payload.email})
      .execute();
    if ((await result).affected === 1) {
      const result = {
        email: payload.email,
        newPassword: payload.newPassword
      } as ResponseUpdatePassword
      return result;
    }
    return null;
  }

  async updatePassword(payload: UpdatePasswordPayload): Promise<ResponseUpdatePassword | null> {
    const resultOldPasswordCorrect: boolean = await this.checkOldPasswordIsCorrect(payload);
    const resultNewPasswordMatchRetypePassword: boolean = payload.newPassword === payload.retypePassword;

    if (!resultOldPasswordCorrect) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Old password not correct. Please check again!`
      } as RpcExceptionModel);
    }

    if (!resultNewPasswordMatchRetypePassword) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `New password must match with retype password`
      } as RpcExceptionModel);
    }

    if (payload && resultOldPasswordCorrect && resultNewPasswordMatchRetypePassword) {
      const role = payload.role;
      switch (role) {
        case Role.Admin : {
          const adminResult = await this.updatePasswordAdmin(payload);
          return adminResult
          break;
        }
        case Role.Trainer : {
          const trainerResult = await this.updatePasswordTrainer(payload);
          return trainerResult
          break;
        }
        case Role.Customer : {
          const custResult = await this.updatePasswordCustomer(payload);
          return custResult
          break;
        }
        default: {
          break;
        }
      }
    }
    return null;
  }

  private async updateStatusAdmin(payload: UpdateStatusPayload): Promise<ResponseUpdateStatus | null> {
    const result = this.adminRepository.createQueryBuilder()
      .update(AdminEntity)
      .set({
        status: payload.status
      })
      .where("email = :email", {email: payload.email})
      .execute();
    if ((await result).affected === 1) {
      const result = {
        email: payload.email,
        status: payload.status
      } as ResponseUpdateStatus
      return result;
    }
    return null;
  }

  private async updateStatusTrainer(payload: UpdateStatusPayload): Promise<ResponseUpdateStatus | null> {
    const result = this.trainerRepository.createQueryBuilder()
      .update(TrainerEntity)
      .set({
        status: payload.status
      })
      .where("email = :email", {email: payload.email})
      .execute();
    if ((await result).affected === 1) {
      const result = {
        email: payload.email,
        status: payload.status
      } as ResponseUpdateStatus
      return result;
    }
    return null;
  }

  private async updateStatusCustomer(payload: UpdateStatusPayload): Promise<ResponseUpdateStatus | null> {
    const result = this.customerRepository.createQueryBuilder()
      .update(CustomerEntity)
      .set({
        status: payload.status
      })
      .where("email = :email", {email: payload.email})
      .execute();
    if ((await result).affected === 1) {
      const result = {
        email: payload.email,
        status: payload.status
      } as ResponseUpdateStatus
      return result;
    }
    return null;
  }

  async updateStatus(payload: UpdateStatusPayload): Promise<ResponseUpdateStatus> {
    if (payload) {
      const role = payload.role;
      switch (role) {
        case Role.Admin : {
          const admin = await this.checkEmailAdminExist(payload.email);
          if (!admin) {
            throw new RpcException({
              statusCode: HttpStatus.NOT_FOUND,
              message: `Not found admin with email: ${payload.email}`
            } as RpcExceptionModel);
          }
          const result = await this.updateStatusAdmin(payload);
          return result;
          break;
        }
        case Role.Customer : {
          const customer = await this.checkEmailCustomerExist(payload.email);
          if (!customer) {
            throw new RpcException({
              statusCode: HttpStatus.NOT_FOUND,
              message: `Not found customer with email: ${payload.email}`
            } as RpcExceptionModel);
          }
          const result = await this.updateStatusCustomer(payload);
          return result;
          break;
        }
        case Role.Trainer : {
          const trainer = await this.checkEmailTrainerExist(payload.email);
          if (!trainer) {
            throw new RpcException({
              statusCode: HttpStatus.NOT_FOUND,
              message: `Not found trainer with email: ${payload.email}`
            } as RpcExceptionModel);
          }
          const result = await this.updateStatusTrainer(payload);
          return result;
          break;
        }
        default: {
          break;
        }
      }
    }
  }
}
