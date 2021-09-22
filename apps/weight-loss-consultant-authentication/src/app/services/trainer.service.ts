import { BaseService } from './base/base.service';
import { TrainerEntity } from '../entities/trainer.entity';
import { TrainerRepository } from '../repositories/trainer.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TrainerService extends BaseService<TrainerEntity, TrainerRepository> {
  constructor(repository: TrainerRepository) {
    super(repository);
  }

  findByEmail(email: string): Promise<TrainerEntity | null> {
    return this.repository.findOne({ email: email });
  }
}
