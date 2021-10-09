import {HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from '../base.service';
import {DeleteResult, UpdateResult} from 'typeorm';
import {AdminRepository} from '../../repositories/admin.repository';
import {AdminEntity} from '../../entities/admin.entity';
import {AdminMapper} from '../../mappers/admin.mapper';
import {CreateAdminDto} from '../../dtos/admin/create-admin.dto';
import {UpdateAdminDto} from '../../dtos/admin/update-admin.dto';
import {EMAIL_EXISTED_ERR, NOT_FOUND_ERR_MSG} from '../../constants/validation-err-message';
import {RpcException} from '@nestjs/microservices';
import {RpcExceptionModel} from '../../../../../common/filters/rpc-exception.model';

@Injectable()
export class AdminService extends BaseService<AdminEntity, AdminRepository> {

  constructor(repository: AdminRepository) {
    super(repository);
  }

  async findAll(): Promise<AdminEntity[]> {
    return this.repository.find();
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
    return AdminMapper.mapUpdateAdminDTOToEntity(payload.dto)
      .then((entity) => {
        if (payload.email !== payload.dto.email) {
          throw new RpcException({
            statusCode: HttpStatus.CONFLICT,
            message: `Param: ${payload.dto.email} must match with request body email : ${payload.email} `
          } as RpcExceptionModel);
        }
        return entity;
      })
      .then((entity) => this.repository.findOne(entity.email))
      .then((entity) => {
        if (entity === undefined) {
          throw new RpcException({
            statusCode: HttpStatus.BAD_REQUEST,
            //undefined, so cannot reference to email => payload.email
            message: `Not found admin with email: ${payload.email}`
          } as RpcExceptionModel);
        }
        return entity;
      })
      .then((entity) => this.repository.update(entity.email, entity));
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
    return this.repository.findOneOrFail(id).catch((err) => {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: NOT_FOUND_ERR_MSG + id
      } as RpcExceptionModel);
    });
  }
}
