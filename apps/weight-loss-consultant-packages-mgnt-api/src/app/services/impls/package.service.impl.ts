import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {BaseService} from "../../../../../weight-loss-consultant-users-mgnt-api/src/app/services/base.service";
import {DeleteResult, getConnection, UpdateResult} from "typeorm";
import {CampaignEntity} from "../../entities/campaign.entity";
import {CampaignRepository} from "../../repositories/campaign.repository";
import {CampaignMapper} from "../../mappers/campaign.mapper";
import {CreateCampaignDto} from "../../dtos/campaign/create-campaign";
import {UpdateCampaignDto} from "../../dtos/campaign/update-campaign";
import {CustomerService} from "../../../../../weight-loss-consultant-users-mgnt-api/src/app/services/impl/customer.service.impl";
import {PackageEntity} from "../../entities/package.enttiy";
import {PackageRepository} from "../../repositories/package.repository";
import {PackageMapper} from "../../mappers/package.mapper";
import {TrainerService} from "../../../../../weight-loss-consultant-users-mgnt-api/src/app/services/impl/trainer.service.impl";
import {CreatePackageDto} from "../../dtos/package/create-package";
import {UpdatePackageDto} from "../../dtos/package/update-package";

@Injectable()
export class PackageService extends BaseService<PackageEntity, PackageRepository> {
  constructor(repository: PackageRepository, private packageMapper: PackageMapper, private trainerService: TrainerService) {
    super(repository);
  }

  async findAll(): Promise<PackageEntity[] | null> {
    return await this.repository.find();
  }

  async create(dto: CreatePackageDto): Promise<any> {
    const trainerEmail = dto.trainerEmail;
    const findTrainer = await this.trainerService.findById(trainerEmail);
    if (findTrainer === undefined) {
      throw new NotFoundException(`Not found trainer with email: ${trainerEmail}`)
    }
    const entity: PackageEntity = await PackageMapper.mapCreatePackageDtoToEntity(dto, findTrainer);
    return await this.repository.save(entity);
  }

  async edit(dto: UpdatePackageDto, id: number): Promise<any> {

    if (id != dto.id) {
      throw new ConflictException(`Param id: ${id} must match with id in request body: ${dto.id}`)
    }
    const trainerEmail = dto.trainerEmail;
    const trainer = await this.trainerService.findById(trainerEmail);
    if (trainer === undefined) {
      throw new NotFoundException(`Not found trainer with email: ${trainerEmail}`)
    }
    const existedPackage = await this.viewDetail(dto.id);
    if (existedPackage.length === 0) {
      throw new NotFoundException(`Not found package with id: ${id}`)
    }
    const entity: PackageEntity = await PackageMapper.mapUpdatePackageDtoToEntity(dto, trainer);
    return await this.repository.update(id, entity);

  }

  async delete(id): Promise<DeleteResult> {
    const existedPackage = await this.viewDetail(id);
    if (existedPackage.length === 0) {
      throw new NotFoundException(`Not found package with id: ${id}`)
    }
    return await this.repository.delete(id);
  }

  async viewDetail(id): Promise<any> {
    return await this.repository.find({
      relations: ["trainer"],
      where: [{
        id: `${id}`
      }],
    })
  }

  async getPackageDetailsWithTrainer(): Promise<PackageEntity[] | null> {
    return await this.repository.find({relations: ["trainer"]})
  }
}
