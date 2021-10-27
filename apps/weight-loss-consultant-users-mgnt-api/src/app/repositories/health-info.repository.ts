import { EntityRepository, Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import {HeathInfoEntity} from "../entities/health-info.entity";

@EntityRepository(HeathInfoEntity)
export class HealthRepository extends Repository<HeathInfoEntity>{


}
