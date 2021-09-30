import {ConflictException, Injectable, LoggerService, NotFoundException} from "@nestjs/common";
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
    return await this.repository.find({
      relations: ["packages"]
    });
  }

  async create(dto: CreateTrainerDto) : Promise<TrainerEntity | null> {
    const entity : TrainerEntity  = await TrainerMapper.mapCreateDtoToEntity(dto);
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail) {
      throw new ConflictException(EMAIL_EXISTED_ERR);
    }
    return await this.repository.save(entity);
  }

  async edit(dto : UpdateTrainerDto, email: string) : Promise<UpdateResult> {
    const entity : TrainerEntity = await TrainerMapper.mapUpdateTrainerDTOToEntity(dto);
    if (email !== entity.email) {
      throw new ConflictException(`Param: ${email} must match with ${entity.email} in request body`)
    }
    const foundTrainer = await this.repository.findOne(entity.email);
    if (foundTrainer === undefined) {
      throw new NotFoundException(`Not found trainer with email : ${entity.email}`)
    }
    return await this.repository.update(entity.email, entity );
  }

  async delete(id) : Promise<DeleteResult>{
    const foundTrainer = await this.repository.findOne(id);
    if (foundTrainer === undefined) {
      throw new NotFoundException(`Not found trainer with email : ${foundTrainer.email}`)
    }
    return await this.repository.delete(id);
  }

  async viewDetail(id) : Promise<TrainerEntity[]>{
    return await this.repository.find({
      relations: ["packages"],
      where: [{
        email: `${id}`
      }]
    });
  }

  async findOneTrainer(id) : Promise<TrainerEntity> {
    return await this.repository.findOne(id);
  }

}
