import {HttpStatus, Injectable} from '@nestjs/common';
import {PackageEntity} from '../../entities/package.enttiy';
import {BaseService} from '../base.service';
import {PackageRepository} from "../../repositories/package.repository";

@Injectable()
export class PackageService extends BaseService<PackageEntity, PackageRepository> {

  constructor(repository: PackageRepository) {
    super(repository);
  }

  async viewDetail(id): Promise<PackageEntity> {
    return await this.repository.createQueryBuilder("a")
      .where("a.id = :id", {id : id})
      .getOne();
  }

}
