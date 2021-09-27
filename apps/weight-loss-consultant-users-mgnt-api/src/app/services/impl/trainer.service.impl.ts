import {ConflictException, Injectable, LoggerService} from "@nestjs/common";
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



@Injectable()
export class TrainerService extends BaseService<TrainerEntity, TrainerRepository>{

  constructor(repository: TrainerRepository, private trainerMapper: TrainerMapper){
    super(repository);
  }

  async findAll() : Promise<TrainerEntity[] | null>{
    return await this.repository.find();
  }

  async create(dto: CreateTrainerDto) : Promise<TrainerEntity | null> {
    const entity : TrainerEntity  = await TrainerMapper.mapCreateDtoToEntity(dto);
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail) {
      throw new ConflictException(EMAIL_EXISTED_ERR);
    }
    return await this.repository.save(entity);
  }

  async edit(dto : UpdateTrainerDto) : Promise<UpdateResult> {
    const entity : TrainerEntity = await TrainerMapper.mapUpdateTrainerDTOToEntity(dto);
    return await this.repository.update(entity.email, entity );
  }

  async delete(id) : Promise<DeleteResult>{
    return await this.repository.delete(id);
  }

  async viewDetail(id) : Promise<TrainerEntity | null>{
    return await this.repository.findOne(id);
  }

}
