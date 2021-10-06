import { HttpStatus, Injectable } from '@nestjs/common';

import { BaseService } from '../base.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TrainerEntity } from '../../entities/trainer.entity';
import { TrainerRepository } from '../../repositories/trainer.repository';
import { TrainerMapper } from '../../mappers/trainer.mapper';
import { CreateTrainerDto } from '../../dtos/trainer/create-trainer';
import { UpdateTrainerDto } from '../../dtos/trainer/update-trainer';
import { EMAIL_EXISTED_ERR } from '../../constants/validation-err-message';
import { RpcException } from '@nestjs/microservices';
import { RpcExceptionModel } from '../../filters/rpc-exception.model';

@Injectable()
export class TrainerService extends BaseService<TrainerEntity, TrainerRepository> {

  constructor(repository: TrainerRepository, private trainerMapper: TrainerMapper) {
    super(repository);
  }

  async findAll(): Promise<TrainerEntity[]> {
    return this.repository.find({
      relations: ["packages"]
    });
  }

  async create(dto: CreateTrainerDto): Promise<TrainerEntity> {
    const entity: TrainerEntity = await TrainerMapper.mapCreateDtoToEntity(dto);
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: EMAIL_EXISTED_ERR
      } as RpcExceptionModel);
    }
    return this.repository.save(entity);
  }

  async edit(dto: UpdateTrainerDto, email: string): Promise<UpdateResult> {
    const entity: TrainerEntity = await TrainerMapper.mapUpdateTrainerDTOToEntity(dto);
    if (email !== entity.email) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param: ${email} must match with ${entity.email} in request body`
      } as RpcExceptionModel);
    }
    const foundTrainer = await this.repository.findOne(entity.email);
    if (foundTrainer === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found trainer with email : ${entity.email}`
      } as RpcExceptionModel);
    }
    return this.repository.update(entity.email, entity);
  }

  async delete(id): Promise<DeleteResult> {
    const foundTrainer = await this.repository.findOne(id);
    if (foundTrainer === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found trainer with email : ${id}`
      } as RpcExceptionModel);
    }
    return this.repository.delete(id);
  }

  async viewDetail(id): Promise<TrainerEntity> {
    return this.repository.findOne({
      relations: ["packages"],
      where: [{
        email: `${id}`
      }]
    });
  }

  async findOneTrainer(id): Promise<TrainerEntity> {
    return this.repository.findOne(id);
  }
}
