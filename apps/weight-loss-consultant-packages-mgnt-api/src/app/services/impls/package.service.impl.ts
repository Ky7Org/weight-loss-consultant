import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PackageEntity } from '../../entities/package.enttiy';
import { PackageMapper } from '../../mappers/package.mapper';
import { CreatePackageDto } from '../../dtos/package/create-package';
import { UpdatePackageDto } from '../../dtos/package/update-package';
import { BaseService } from '../base.service';
import { USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../../constant';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { TrainerEntity } from '../../entities/trainer.entity';
import { TRAINER_VIEW_DETAIL} from '../../../../../common/routes/users-management-service-routes';
import { RpcExceptionModel } from '../../../../../common/filters/rpc-exception.model';
import {Observable} from "rxjs";
import {PackageRepository} from "../../repositories/package.repository";

@Injectable()
export class PackageService extends BaseService<PackageEntity, PackageRepository> {
  constructor(repository: PackageRepository,
              private readonly packageMapper: PackageMapper,
              @Inject(USERS_MANAGEMENT_SERVICE_NAME)
                private readonly usersManagementServiceProxy: ClientProxy) {
    super(repository);
  }

  private validateTrainer(username: string): Observable<TrainerEntity> {
    return this.usersManagementServiceProxy
      .send<TrainerEntity, string>({ cmd: TRAINER_VIEW_DETAIL }, username);
  }

  async findAll(): Promise<PackageEntity[]> {
    return this.repository.find();
  }

  async create(dto: CreatePackageDto): Promise<PackageEntity> {
    const trainerEmail = dto.trainerEmail;
    const findTrainer = await this.validateTrainer(trainerEmail).toPromise();
    if (findTrainer === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found trainer with email: ${trainerEmail}`
      } as RpcExceptionModel);
    }
    const entity: PackageEntity = await PackageMapper.mapCreatePackageDtoToEntity(dto, findTrainer);
    return this.repository.save(entity);
  }

  async edit(dto: UpdatePackageDto, id: number): Promise<UpdateResult> {
    if (id != dto.id) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param id: ${id} must match with id in request body: ${dto.id}`
      } as RpcExceptionModel);
    }
    const findTrainer = await this.validateTrainer(dto.trainerEmail).toPromise();

    if (findTrainer === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found trainer with email: ${dto.trainerEmail}`
      } as RpcExceptionModel);
    }
    const existedPackage = await this.viewDetail(dto.id);
    if (existedPackage === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found package with id: ${id}`
      } as RpcExceptionModel);    }
    const entity: PackageEntity = await PackageMapper.mapUpdatePackageDtoToEntity(dto, findTrainer);
    return this.repository.update(id, entity);
  }

  async delete(id): Promise<DeleteResult> {
    const existedPackage = await this.viewDetail(id);
    if (existedPackage === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found package with id: ${id}`
      } as RpcExceptionModel);
    }
    return this.repository.delete(id);
  }

  async viewDetail(id): Promise<PackageEntity> {
    const result = await this.repository.createQueryBuilder("p")
      .leftJoinAndSelect("p.trainer", "trainer")
      .where("p.id = :id", {id : id})
      .getOne();
    if (!result) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found package with id: ${id}`
      } as RpcExceptionModel);
    }
    return result;
  }

  async getPackageDetailsWithTrainer(): Promise<PackageEntity[] | null> {
    return this.repository.find({relations: ["trainer"]});
  }
}
