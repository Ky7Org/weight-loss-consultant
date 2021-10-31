import { EntityRepository, Repository } from 'typeorm';
import {ReportEntity} from "../entities/report.entity";

@EntityRepository(ReportEntity)
export class ReportRepository extends Repository<ReportEntity>{

}
