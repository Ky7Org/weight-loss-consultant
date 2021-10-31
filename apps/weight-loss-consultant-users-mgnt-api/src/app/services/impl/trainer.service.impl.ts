import {HttpStatus, Injectable} from '@nestjs/common';

import {BaseService} from '../base.service';
import {DeleteResult, UpdateResult} from 'typeorm';
import {TrainerEntity} from '../../entities/trainer.entity';
import {TrainerRepository} from '../../repositories/trainer.repository';
import {TrainerMapper} from '../../mappers/trainer.mapper';
import {CreateTrainerDto} from '../../dtos/trainer/create-trainer';
import {UpdateTrainerDto} from '../../dtos/trainer/update-trainer';
import {EMAIL_EXISTED_ERR} from '../../constants/validation-err-message';
import {RpcException} from '@nestjs/microservices';
import {RpcExceptionModel} from '../../../../../common/filters/rpc-exception.model';
import {UpdateTrainerPayload} from "../../../../../common/dtos/update-without-password-and-status.payload";

@Injectable()
export class TrainerService extends BaseService<TrainerEntity, TrainerRepository> {

  constructor(repository: TrainerRepository, private trainerMapper: TrainerMapper) {
    super(repository);
  }

  async findAll(): Promise<TrainerEntity[]> {
    const result = await this.repository.createQueryBuilder("trainer")
      .leftJoinAndSelect("trainer.profileStyles", "profileStyles")
      .leftJoinAndSelect("profileStyles.style", "style")
      .leftJoinAndSelect("trainer.packages", "package")
      .getMany();
    return result;
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
    const phoneTrainer = await this.repository.createQueryBuilder("trainer")
      .where("trainer.phone = :phone", {phone : entity.phone})
      .getOne();
    if (phoneTrainer) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `The phone number has been already registered, please choose another one.`
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
    const result = await this.repository.createQueryBuilder("trainer")
      .leftJoinAndSelect("trainer.profileStyles", "profileStyles")
      .leftJoinAndSelect("profileStyles.style", "style")
      .leftJoinAndSelect("trainer.packages", "package")
      .where("trainer.email = :email", {email : id})
      .getOne();
    return result;
  }

  async findOneTrainer(id): Promise<TrainerEntity> {
    return this.repository.findOne(id);
  }

  async updateProfileWithoutPasswordAndStatus(payload : UpdateTrainerPayload) : Promise<UpdateResult> {
    if (payload.email !== payload.email) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param: ${payload.email} must match with request body email : ${payload.email} `
      } as RpcExceptionModel);
    }
    const result = await this.repository.createQueryBuilder("trainer")
      .update(TrainerEntity)
      .set({
        fullname: payload.fullname,
        address: payload.address,
        phone: payload.phone,
        gender: payload.gender,
        profileImage : payload.profileImage,
        dob : payload.dob,
        yearOfExp: payload.yearOfExp,
        rating: payload.rating,
      })
      .where("email = :email", {email : payload.email})
      .execute();
    return result;
  }
}
