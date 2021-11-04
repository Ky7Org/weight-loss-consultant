import { EntityRepository, Repository } from 'typeorm';
import { ReportMediaEntity } from '../entities/report-media.entity';

@EntityRepository(ReportMediaEntity)
export class ReportMediaRepository extends Repository<ReportMediaEntity>{

}
