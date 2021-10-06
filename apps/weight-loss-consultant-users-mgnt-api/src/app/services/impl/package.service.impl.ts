import { HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PackageEntity } from '../../entities/package.enttiy';
import { PackageRepository } from '../../repositories/package.repository';
import { PackageMapper } from '../../mappers/package.mapper';
import { CreatePackageDto } from '../../dtos/package/create-package';
import { UpdatePackageDto } from '../../dtos/package/update-package';
import { BaseService } from '../base.service';
import { TrainerService } from './trainer.service.impl';
import { RpcException } from '@nestjs/microservices';
import { RpcExceptionModel } from '../../../../../common/filters/rpc-exception.model';

@Injectable()
export class PackageService extends BaseService<PackageEntity, PackageRepository> {

  constructor(repository: PackageRepository, private packageMapper: PackageMapper, private trainerService: TrainerService) {
    super(repository);
  }

  async findAll(): Promise<PackageEntity[] | null> {
    return await this.repository.find();
  }

  async create(dto: CreatePackageDto): Promise<PackageEntity> {
    const trainerEmail = dto.trainerEmail;
    const findTrainer = await this.trainerService.findById(trainerEmail);
    if (findTrainer === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Not found trainer with email: ${trainerEmail}`
      } as RpcExceptionModel);
    }
    return PackageMapper.mapCreatePackageDtoToEntity(dto, findTrainer)
      .then(this.repository.save);
  }

  async edit(dto: UpdatePackageDto, id: number): Promise<UpdateResult> {
    if (id !== dto.id) {
      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `Param id: ${id} must match with id in request body: ${dto.id}`
      } as RpcExceptionModel);
    }
    const trainerEmail = dto.trainerEmail;
    const trainer = await this.trainerService.findById(trainerEmail);
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
      } as RpcExceptionModel);
    }
    return PackageMapper.mapUpdatePackageDtoToEntity(dto, trainer)
      .then(entity => this.repository.update(id, entity));
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
    })
  }

  async getPackageDetailsWithTrainer(): Promise<PackageEntity[]> {
    return this.repository.find({relations: ["trainer"]})
  }
}
