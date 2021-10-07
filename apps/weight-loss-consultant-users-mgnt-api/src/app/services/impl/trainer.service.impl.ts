import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";

import {BaseService} from "../base.service";
import {
  DeleteResult,
  UpdateResult
} from "typeorm";
import {TrainerEntity} from "../../entities/trainer.entity";
import {TrainerRepository} from "../../repositories/trainer.repository";
import {TrainerMapper} from "../../mappers/trainer.mapper";
import {CreateTrainerDto} from "../../dtos/trainer/create-trainer";
import {UpdateTrainerDto} from "../../dtos/trainer/update-trainer";
import {EMAIL_EXISTED_ERR} from "../../constants/validation-err-message";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";

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
      throw new ConflictException(EMAIL_EXISTED_ERR);
    }
    return this.repository.save(entity);
  }

  async edit(dto: UpdateTrainerDto, email: string): Promise<UpdateResult> {
    const entity: TrainerEntity = await TrainerMapper.mapUpdateTrainerDTOToEntity(dto);
    if (email !== entity.email) {
      throw new ConflictException(`Param: ${email} must match with ${entity.email} in request body`)
    }
    const foundTrainer = await this.repository.findOne(entity.email);
    if (foundTrainer === undefined) {
      throw new NotFoundException(`Not found trainer with email : ${entity.email}`)
    }
    return this.repository.update(entity.email, entity);
  }

  async delete(id): Promise<DeleteResult> {
    const foundTrainer = await this.repository.findOne(id);
    if (foundTrainer === undefined) {
      throw new NotFoundException(`Not found trainer with email : ${id}`)
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

}
