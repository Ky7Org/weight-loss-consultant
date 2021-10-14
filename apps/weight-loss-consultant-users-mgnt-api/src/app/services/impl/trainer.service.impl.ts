import { HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TrainerEntity } from '../../entities/trainer.entity';
import { TrainerRepository } from '../../repositories/trainer.repository';
import { CreateTrainerDto } from '../../dtos/trainer/create-trainer';
import { UpdateTrainerDto } from '../../dtos/trainer/update-trainer';
import { RedisCacheService } from '../redis-cache.service';
import { TRAINER_SERVICE_FIND_ALL_KEY, TRAINER_SERVICE_VIEW_DETAIL_KEY } from '../../../../../common/redis-routes';
import { TrainerMapper } from '../../../../../common/mappers/trainer.mapper';
import { BaseService } from '../../../../../common/services/base.service';
import { EMAIL_EXISTED_ERR } from '../../../../../common/constants/validation-err-message';
import { constructGrpcException } from '../../../../../common/utils';

@Injectable()
export class TrainerService extends BaseService<TrainerEntity, TrainerRepository> {

  constructor(repository: TrainerRepository, private readonly redisCacheService: RedisCacheService) {
    super(repository);
  }

  async findAll(): Promise<TrainerEntity[]> {
    let result = await this.redisCacheService.get<TrainerEntity[]>(`${TRAINER_SERVICE_FIND_ALL_KEY}`);
    if (result === null) {
      result = await this.repository.createQueryBuilder("trainer")
        .leftJoinAndSelect("trainer.profileStyles", "profileStyles")
        .leftJoinAndSelect("profileStyles.style", "style")
        .leftJoinAndSelect("trainer.packages", "package")
        .getMany();
      if (result !== undefined) {
        await this.redisCacheService.set<TrainerEntity[]>(`${TRAINER_SERVICE_FIND_ALL_KEY}`, result);
      } else {
        result = [];
      }
    }
    return result;
  }

  async create(dto: CreateTrainerDto): Promise<TrainerEntity> {
    const entity = await TrainerMapper.mapCreateDtoToEntity(dto);
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail) {
      throw constructGrpcException(HttpStatus.CONFLICT, `${EMAIL_EXISTED_ERR}`);
    }
    await this.redisCacheService.del(`${TRAINER_SERVICE_VIEW_DETAIL_KEY}${dto.email}`);
    return this.repository.save(entity);
  }

  async edit(dto: UpdateTrainerDto, email: string): Promise<UpdateResult> {
    const entity = await TrainerMapper.mapUpdateTrainerDTOToEntity(dto);
    if (email !== entity.email) {
      throw constructGrpcException(HttpStatus.CONFLICT,
        `Param: ${email} must match with ${entity.email} in request body`);
    }
    const admin = await this.repository.createQueryBuilder("trainer")
      .where("trainer.phone = :phone", {phone: entity.phone})
      .getOne();
    if (admin) {
      throw constructGrpcException(HttpStatus.CONFLICT, `The phone number has already existed. Please choose another one.`);
    }
    const foundTrainer = await this.repository.findOne(entity.email);
    if (foundTrainer === undefined) {
      throw constructGrpcException(HttpStatus.NOT_FOUND,
        `Not found trainer with email : ${entity.email}`);
    }
    await this.redisCacheService.del(`${TRAINER_SERVICE_VIEW_DETAIL_KEY}${email}`);
    return this.repository.update(entity.email, entity);
  }

  async delete(id): Promise<DeleteResult> {
    if (id === null || id === undefined) {
      throw constructGrpcException(HttpStatus.NOT_FOUND,
        `Trainer isn't found with the provided id`);
    }
    const foundTrainer = await this.repository.findOne(id);
    if (foundTrainer === undefined) {
      throw constructGrpcException(HttpStatus.NOT_FOUND,
        `Not found trainer with email : ${id}`);
    }
    await this.redisCacheService.del(`${TRAINER_SERVICE_VIEW_DETAIL_KEY}${id}`);
    return this.repository.delete(id);
  }

  async viewDetail(id): Promise<TrainerEntity> {
    if (id === null || id === undefined) {
      throw constructGrpcException(HttpStatus.NOT_FOUND,
        `Trainer isn't found with the provided id`);
    }
    let result = await this.redisCacheService.get<TrainerEntity>(`${TRAINER_SERVICE_VIEW_DETAIL_KEY}${id}`);
    if (result === null) {
      result = await this.repository.createQueryBuilder("trainer")
        .leftJoinAndSelect("trainer.profileStyles", "profileStyles")
        .leftJoinAndSelect("profileStyles.style", "style")
        .leftJoinAndSelect("trainer.packages", "package")
        .where("trainer.email = :email", {email: id})
        .getOne();
      if (result !== undefined) {
        await this.redisCacheService.set<TrainerEntity>(`${TRAINER_SERVICE_VIEW_DETAIL_KEY}${id}`, result);
      } else {
        result = {} as TrainerEntity;
      }
    }
    return result;
  }

  async findOneTrainer(id): Promise<TrainerEntity> {
    if (id === null || id === undefined) {
      throw constructGrpcException(HttpStatus.NOT_FOUND,
        `Trainer isn't found with the provided id`);
    }
    return this.repository.findOne(id);
  }
}
