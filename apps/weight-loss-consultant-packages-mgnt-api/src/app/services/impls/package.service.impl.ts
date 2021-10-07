import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PackageEntity } from '../../entities/package.enttiy';
import { PackageRepository } from '../../repositories/package.repository';
import { PackageMapper } from '../../mappers/package.mapper';
import { CreatePackageDto } from '../../dtos/package/create-package';
import { UpdatePackageDto } from '../../dtos/package/update-package';
import { BaseService } from '../base.service';
import { USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../../constant';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { TrainerEntity } from '../../entities/trainer.entity';
import { GET_TRAINER_BY_EMAIL } from '../../../../../common/routes/users-management-service-routes';
import { RpcExceptionModel } from '../../../../../common/filters/rpc-exception.model';

@Injectable()
export class PackageService extends BaseService<PackageEntity, PackageRepository> {
  constructor(repository: PackageRepository,
              private readonly packageMapper: PackageMapper,
              @Inject(USERS_MANAGEMENT_SERVICE_NAME)
                private readonly usersManagementServiceProxy: ClientProxy) {
    super(repository);
  }

  async findAll(): Promise<PackageEntity[]> {
    return this.repository.find();
  }

  async create(dto: CreatePackageDto): Promise<PackageEntity> {
    const trainerEmail = dto.trainerEmail;
    const findTrainer = await this.usersManagementServiceProxy
      .send<TrainerEntity, string>({cmd: GET_TRAINER_BY_EMAIL}, trainerEmail)
      .toPromise();
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
    const trainerEmail = dto.trainerEmail;
    const trainer = await this.usersManagementServiceProxy
      .send<TrainerEntity, string>({cmd: GET_TRAINER_BY_EMAIL}, trainerEmail)
      .toPromise();

    if (trainer === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found trainer with email: ${trainerEmail}`
      } as RpcExceptionModel);
    }
    const existedPackage = await this.viewDetail(dto.id);
    if (existedPackage === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Not found package with id: ${id}`
      } as RpcExceptionModel);    }
    const entity: PackageEntity = await PackageMapper.mapUpdatePackageDtoToEntity(dto, trainer);
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
    return this.repository.findOne({
      relations: ["trainer"],
      where: [{
        id: `${id}`
      }],
    });
  }

  async getPackageDetailsWithTrainer(): Promise<PackageEntity[] | null> {
    return this.repository.find({relations: ["trainer"]});
  }
}
