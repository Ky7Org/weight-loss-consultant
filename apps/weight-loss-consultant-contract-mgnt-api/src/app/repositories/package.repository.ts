import { EntityRepository, Repository } from 'typeorm';
import { PackageEntity } from '../entities/package.enttiy';

@EntityRepository(PackageEntity)
export class PackageRepository extends Repository<PackageEntity>{

}
