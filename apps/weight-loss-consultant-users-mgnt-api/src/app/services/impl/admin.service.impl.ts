import {HttpStatus, Injectable} from '@nestjs/common';
import {DeleteResult, UpdateResult} from 'typeorm';
import {AdminRepository} from '../../repositories/admin.repository';
import {AdminEntity} from '../../entities/admin.entity';
import {CreateAdminDto} from '../../dtos/admin/create-admin.dto';
import {RedisCacheService} from "../redis-cache.service";
import {ADMIN_SERVICE_FIND_ALL_KEY, ADMIN_SERVICE_VIEW_DETAIL_KEY} from "../../../../../common/redis-routes";
import {AdminMapper} from "../../../../../common/mappers/admin.mapper";
import {BaseService} from "../../../../../common/services/base.service";
import {EMAIL_EXISTED_ERR, NOT_FOUND_ERR_MSG} from "../../../../../common/constants/validation-err-message";
import {constructGrpcException} from "../../../../../common/utils";
import {UpdateAdminEntityRequest} from "../../../../../common/proto-models/users-mgnt.proto";

@Injectable()
export class AdminService extends BaseService<AdminEntity, AdminRepository> {

  constructor(repository: AdminRepository,
              private readonly redisCacheService: RedisCacheService) {
    super(repository);
  }

  async findAll(): Promise<AdminEntity[]> {
    let result = await this.redisCacheService.get<AdminEntity[]>(ADMIN_SERVICE_FIND_ALL_KEY);
    if (result === null) {
      result = await this.repository.find();
      await this.redisCacheService.set<AdminEntity[]>(ADMIN_SERVICE_FIND_ALL_KEY, result);
    }
    return result;
  }

  async create(dto: CreateAdminDto): Promise<AdminEntity> {
    if (dto === undefined || dto === null) {
      throw constructGrpcException(HttpStatus.BAD_REQUEST, `${EMAIL_EXISTED_ERR}`);
    }
    const mappedAdminDto = await AdminMapper.mapCreateAdminDTOToEntity(dto);
    if (await this.repository.findOne(mappedAdminDto?.email)) {
      throw constructGrpcException(HttpStatus.CONFLICT, EMAIL_EXISTED_ERR);
    }
    await this.redisCacheService.del(ADMIN_SERVICE_FIND_ALL_KEY);
    return this.repository.save(mappedAdminDto);
  }

  async edit(payload: UpdateAdminEntityRequest): Promise<UpdateResult> {
    if (payload === undefined || payload === null) {
      throw constructGrpcException(HttpStatus.BAD_REQUEST, `${NOT_FOUND_ERR_MSG}`);
    }
    const mappedAdminDto = await AdminMapper.mapUpdateAdminDTOToEntity(payload.payload);
    if (mappedAdminDto.email !== payload.email) {
      throw constructGrpcException(HttpStatus.CONFLICT,
        `Param: ${payload.payload.email} must match with request body email: ${payload.email}`);
    }
    const adminEntity = await this.repository.findOne(payload.email);
    if (adminEntity === undefined) {
      throw constructGrpcException(HttpStatus.BAD_REQUEST, `${NOT_FOUND_ERR_MSG}${payload.email}`);
    }
    await this.redisCacheService.del(ADMIN_SERVICE_FIND_ALL_KEY);
    return await this.repository.update(mappedAdminDto.email, mappedAdminDto);
  }

  async delete(id): Promise<DeleteResult> {
    if (id === undefined || id === null) {
      throw constructGrpcException(HttpStatus.BAD_REQUEST, `${NOT_FOUND_ERR_MSG}`);
    }
    await this.redisCacheService.del(`${ADMIN_SERVICE_VIEW_DETAIL_KEY}${id}`);
    return this.repository.findOneOrFail(id)
      .catch(() => constructGrpcException(HttpStatus.BAD_REQUEST, `${NOT_FOUND_ERR_MSG}${id}`))
      .then((e) => this.repository.delete(e.email));
  }

  async viewDetail(email: string): Promise<AdminEntity> {
    if (email === undefined || email === null) {
      throw constructGrpcException(HttpStatus.BAD_REQUEST, `${NOT_FOUND_ERR_MSG}`);
    }
    let result = await this.redisCacheService.get<AdminEntity>(`${ADMIN_SERVICE_VIEW_DETAIL_KEY}${email}`);
    if (result === null) {
      result = await this.repository.findOneOrFail(email)
        .catch(() => constructGrpcException(HttpStatus.BAD_REQUEST, `${NOT_FOUND_ERR_MSG}${email}`));
      if (result !== undefined) {
        await this.redisCacheService.set<AdminEntity>(`${ADMIN_SERVICE_VIEW_DETAIL_KEY}${email}`, result);
      }
    }
    return result;
  }
}
