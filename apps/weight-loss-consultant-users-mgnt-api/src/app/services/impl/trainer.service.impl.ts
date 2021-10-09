import {HttpStatus, Injectable} from '@nestjs/common';
import {DeleteResult, UpdateResult} from 'typeorm';
import {TrainerEntity} from '../../entities/trainer.entity';
import {TrainerRepository} from '../../repositories/trainer.repository';
import {CreateTrainerDto} from '../../dtos/trainer/create-trainer';
import {UpdateTrainerDto} from '../../dtos/trainer/update-trainer';
import {RpcException} from '@nestjs/microservices';
import {RpcExceptionModel} from '../../../../../common/filters/rpc-exception.model';
import {RedisCacheService} from "../redis-cache.service";
import {TRAINER_SERVICE_FIND_ALL_KEY, TRAINER_SERVICE_VIEW_DETAIL_KEY} from "../../../../../common/redis-routes";
import {TrainerMapper} from "../../../../../common/mappers/trainer.mapper";
import {BaseService} from "../../../../../common/services/base.service";
import {EMAIL_EXISTED_ERR} from "../../../../../common/constants/validation-err-message";

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

      }
    }
    return result;
  }

  async create(dto: CreateTrainerDto): Promise<TrainerEntity> {
    const entity = await TrainerMapper.mapCreateDtoToEntity(dto);
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: EMAIL_EXISTED_ERR
      } as RpcExceptionModel);
    }
    await this.redisCacheService.del(`${TRAINER_SERVICE_VIEW_DETAIL_KEY}${dto.email}`);
    return this.repository.save(entity);
  }

  async edit(dto: UpdateTrainerDto, email: string): Promise<UpdateResult> {
    const entity = await TrainerMapper.mapUpdateTrainerDTOToEntity(dto);
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
    await this.redisCacheService.del(`${TRAINER_SERVICE_VIEW_DETAIL_KEY}${email}`);
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
    await this.redisCacheService.del(`${TRAINER_SERVICE_VIEW_DETAIL_KEY}${id}`);
    return this.repository.delete(id);
  }

  async viewDetail(id): Promise<TrainerEntity> {
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
      }
    }
    return result;
  }

  async findOneTrainer(id): Promise<TrainerEntity> {
    return this.repository.findOne(id);
  }
}
