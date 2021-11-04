import { EntityRepository, Repository } from 'typeorm';
import { ContractEntity } from '../entities/contract.entity';

@EntityRepository(ContractEntity)
export class ContractRepository extends Repository<ContractEntity>{

}
