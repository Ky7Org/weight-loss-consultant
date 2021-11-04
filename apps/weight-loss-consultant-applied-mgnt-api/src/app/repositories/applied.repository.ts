import { EntityRepository, Repository } from 'typeorm';
import { AppliedEntity } from '../entities/applied.entity';

@EntityRepository(AppliedEntity)
export class AppliedRepository extends Repository<AppliedEntity>{

}
