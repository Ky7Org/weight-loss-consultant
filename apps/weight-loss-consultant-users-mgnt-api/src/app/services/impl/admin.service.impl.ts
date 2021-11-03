import {HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from '../base.service';
import {DeleteResult, UpdateResult} from 'typeorm';
import {AdminRepository} from '../../repositories/admin.repository';
import {AdminEntity} from '../../entities/admin.entity';
import {AdminMapper} from '../../mappers/admin.mapper';
import {CreateAdminDto} from '../../dtos/admin/create-admin.dto';
import {EMAIL_EXISTED_ERR, NOT_FOUND_ERR_MSG} from '../../constants/validation-err-message';
import {RpcException} from '@nestjs/microservices';
import {RpcExceptionModel} from '../../../../../common/filters/rpc-exception.model';
import {UpdateAdminType} from "../../controllers/admin.controller";
import {PaginationDto} from "../../dtos/pagination/pagination.dto";
import {PaginatedResultDto} from "../../dtos/pagination/paginated-result.dto";
import {SortingAndFilteringService} from "../sorting-filtering.service";

@Injectable()
export class AdminService {

  constructor(
    private readonly repository: AdminRepository,
    private readonly pagingService: SortingAndFilteringService) {
  }

  async findAll(payload : PaginationDto): Promise<PaginatedResultDto> {
    if (payload) {
      const result = await this.pagingService.sortingAndFiltering(payload);
      return result;
    }
  }

  async create(dto: CreateAdminDto): Promise<AdminEntity> {
    return AdminMapper.mapCreateAdminDTOToEntity(dto)
      .then(async (entity) => {
        if (await this.repository.findOne(entity.email)) {
          throw new RpcException({
            statusCode: HttpStatus.CONFLICT,
            message: EMAIL_EXISTED_ERR
          } as RpcExceptionModel);
        }
        return entity;
      }).then((entity) => this.repository.save(entity));

  }

  async edit(payload: UpdateAdminType): Promise<UpdateResult> {
    const entity = await AdminMapper.mapUpdateAdminDTOToEntity(payload.dto);
    if (payload.email !== payload.dto.email) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param: ${payload.dto.email} must match with request body email : ${payload.email} `
      } as RpcExceptionModel);
    }
    const foundAdmin = await this.repository.findOne(payload.email);
    if (foundAdmin === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Not found admin with email: ${payload.email}`
      } as RpcExceptionModel);
    }
    if (foundAdmin.phone !== payload.dto.phone){
      const existedPhoneNum = await this.repository.createQueryBuilder("a")
        .where("a.phone = :phone" , {phone: payload.dto.phone})
        .getOne();
      if (existedPhoneNum) {
        throw new RpcException({
          statusCode: HttpStatus.CONFLICT,
          message: `The phone number has been already registered, please choose another one.`
        } as RpcExceptionModel);
      }
    }
    return this.repository.update(entity.email, entity);
  }

  async delete(id): Promise<DeleteResult> {
    return this.repository.findOneOrFail(id).catch((err) => {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Not found admin with email: ${id}`
      } as RpcExceptionModel);
    }).then((e) => this.repository.delete(id));
  }

  async viewDetail(id): Promise<AdminEntity> {
    console.log("assss" + id);
    return this.repository.findOneOrFail(id).catch((err) => {
      console.log("is error");
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: NOT_FOUND_ERR_MSG + id
      } as RpcExceptionModel);
    });
  }
}
