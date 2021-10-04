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
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";


@Injectable()
export class TrainerService extends BaseService<TrainerEntity, TrainerRepository> {

  constructor(repository: TrainerRepository, private trainerMapper: TrainerMapper) {
    super(repository);
  }

  async findAll(): Promise<TrainerEntity[] | null> {
    return await this.repository.find({
      relations: ["packages"]
    });
  }

  async create(dto: CreateTrainerDto): Promise<TrainerEntity | null> {
    const entity: TrainerEntity = await TrainerMapper.mapCreateDtoToEntity(dto);
    const existedEmail = await this.repository.findOne(entity.email);
    if (existedEmail) {
      throw new ConflictException(EMAIL_EXISTED_ERR);
    }
    return await this.repository.save(entity);
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
    return await this.repository.update(entity.email, entity);
  }

  async delete(id): Promise<DeleteResult> {
    const foundTrainer = await this.repository.findOne(id);
    if (foundTrainer === undefined) {
      throw new NotFoundException(`Not found trainer with email : ${id}`)
    }
    return await this.repository.delete(id);
  }

  async viewDetail(id): Promise<TrainerEntity[]> {
    return await this.repository.find({
      relations: ["packages"],
      where: [{
        email: `${id}`
      }]
    });
  }

  async findOneTrainer(id): Promise<TrainerEntity> {
    return await this.repository.findOne(id);
  }

  //SORT by EMAIL
  async orderByEmailAscAndPaginate(options: IPaginationOptions): Promise<Pagination<TrainerEntity>> {
    //providing alias
    const queryBuilder = this.repository.createQueryBuilder('c');
    queryBuilder
      .orderBy('c.email', 'ASC');

    return paginate<TrainerEntity>(queryBuilder, options);
  }

  async orderByEmailDescAndPaginate(options: IPaginationOptions): Promise<Pagination<TrainerEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('c');
    queryBuilder.orderBy('c.email', 'DESC');
    return paginate<TrainerEntity>(queryBuilder, options);
  }

  //
  //SORT by FULLNAME
  async orderByFullNameAscAndPaginate(options: IPaginationOptions): Promise<Pagination<TrainerEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('c');
    queryBuilder.orderBy('c.fullname', 'ASC');
    return paginate<TrainerEntity>(queryBuilder, options);
  }

  async orderByFullNameDescAndPaginate(options: IPaginationOptions): Promise<Pagination<TrainerEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('c');
    queryBuilder.orderBy('c.fullname', 'DESC');
    return paginate<TrainerEntity>(queryBuilder, options);
  }

  //
  //SORT by DOB
  async orderByDOBAscAndPaginate(options: IPaginationOptions): Promise<Pagination<TrainerEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('c');
    queryBuilder.orderBy('c.dob', 'ASC');
    return paginate<TrainerEntity>(queryBuilder, options);
  }

  async orderByDOBDescAndPaginate(options: IPaginationOptions): Promise<Pagination<TrainerEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('c');
    queryBuilder.orderBy('c.dob', 'DESC');
    return paginate<TrainerEntity>(queryBuilder, options);
  }

  //
  //SORT by Year Of Exp
  async orderByYearOfExpAscAndPaginate(options: IPaginationOptions): Promise<Pagination<TrainerEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('c');
    queryBuilder.orderBy('c.yearOfExp', 'ASC');
    return paginate<TrainerEntity>(queryBuilder, options);
  }

  async orderByYearOfExpDescAndPaginate(options: IPaginationOptions): Promise<Pagination<TrainerEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('c');
    queryBuilder.orderBy('c.yearOfExp', 'DESC');
    return paginate<TrainerEntity>(queryBuilder, options);
  }

  //
  //SORT by rating
  async orderByRatingAscAndPaginate(options: IPaginationOptions): Promise<Pagination<TrainerEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('c');
    queryBuilder.orderBy('c.rating', 'ASC');
    return paginate<TrainerEntity>(queryBuilder, options);
  }

  async orderByRatingDescAndPaginate(options: IPaginationOptions): Promise<Pagination<TrainerEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('c');
    queryBuilder.orderBy('c.rating', 'DESC');
    return paginate<TrainerEntity>(queryBuilder, options);
  }

  //
}
