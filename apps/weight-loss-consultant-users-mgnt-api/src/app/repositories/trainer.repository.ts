import {EntityRepository, Repository} from 'typeorm';
import {TrainerEntity} from '../entities/trainer.entity';

@EntityRepository(TrainerEntity)
export class TrainerRepository extends Repository<TrainerEntity> {

}
