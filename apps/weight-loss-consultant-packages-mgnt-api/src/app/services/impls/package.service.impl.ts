import { HttpStatus, Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {DeleteResult, UpdateResult} from 'typeorm';
import {PackageEntity} from '../../entities/package.enttiy';
import {PackageMapper} from '../../mappers/package.mapper';
import {CreatePackageDto} from '../../dtos/package/create-package';
import {UpdatePackageDto} from '../../dtos/package/update-package';
import {BaseService} from '../base.service';
import {ClientKafka, RpcException} from '@nestjs/microservices';
import {TrainerEntity} from '../../entities/trainer.entity';
import {TRAINER_VIEW_DETAIL} from '../../../../../common/routes/users-management-service-routes';
import {RpcExceptionModel} from '../../../../../common/filters/rpc-exception.model';
import { lastValueFrom, Observable } from 'rxjs';
import {PackageRepository} from "../../repositories/package.repository";
import {UpdateStatusPackagePayload} from "../../../../../common/dtos/update-package-dto.payload";
import { KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../../common/kafka-utils';

@Injectable()
export class PackageService extends BaseService<PackageEntity, PackageRepository>
  implements OnModuleInit, OnModuleDestroy {

  @Inject('SERVER')
  private readonly usersManagementClient: ClientKafka;

  constructor(repository: PackageRepository) {
    super(repository);
  }

  async onModuleInit() {
    for (const [key, value] of Object.entries(MESSAGE_PATTERN)) {
      for (const [key2, value2] of Object.entries(value)) {
        this.usersManagementClient.subscribeToResponseOf(value2);
      }    }
    this.usersManagementClient.connect();
  }

  async onModuleDestroy() {
    await this.usersManagementClient.close();
  }

  private validateTrainer(username: string): Observable<TrainerEntity> {
    return this.usersManagementClient
      .send<TrainerEntity, string>(MESSAGE_PATTERN.trainers.getByEmail, username);
  }

  async findAll(): Promise<PackageEntity[]> {
    return this.repository.find();
  }

  async create(dto: CreatePackageDto): Promise<PackageEntity> {
    const trainerEmail = dto.trainerEmail;
    const findTrainer = await lastValueFrom(this.validateTrainer(trainerEmail));
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
    return this.repository.createQueryBuilder("p")
      .leftJoinAndSelect("p.trainer", "trainer")
      .where("p.id = :id", {id : id})
      .getOneOrFail().catch((err) => {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Not found package with id: ${id}`
        } as RpcExceptionModel);
      });
  }

  async getPackageDetailsWithTrainer(): Promise<PackageEntity[] | null> {
    return this.repository.createQueryBuilder("package")
      .leftJoinAndSelect("package.trainer", "trainer")
      .orderBy("package.createDate", "DESC")
      .getMany();
  }

  async updateStatus(payload : UpdateStatusPackagePayload) : Promise<boolean>  {
    const exist = await this.viewDetail(payload.id);
    if (!exist) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Not found package with id: ${payload.id}`
        } as RpcExceptionModel);
    }
    const result = this.repository.createQueryBuilder()
      .update(PackageEntity)
      .set({
        status: payload.status
      })
      .where("id = :id", {id: payload.id})
      .execute();
    if ((await result).affected === 1) {
      return true;
    }
    return false;
  }
}
