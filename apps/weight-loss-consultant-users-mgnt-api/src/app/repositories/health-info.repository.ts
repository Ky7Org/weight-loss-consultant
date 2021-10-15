import { EntityRepository, Repository } from 'typeorm';
import {HeathInfoEntity} from "../entities/health-info.entity";

@EntityRepository(HeathInfoEntity)
export class HealthRepository extends Repository<HeathInfoEntity>{

}
