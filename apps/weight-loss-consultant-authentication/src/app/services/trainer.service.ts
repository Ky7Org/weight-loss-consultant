import { BaseService } from './base/base.service';
import { TrainerEntity } from '../entities/trainer.entity';
import { TrainerRepository } from '../repositories/trainer.repository';
import { Injectable } from '@nestjs/common';
import { TrainerMapper } from '../mappers/trainer.mapper';
import { TrainerDTO } from '../dtos/trainer.dto';

@Injectable()
export class TrainerService extends BaseService<TrainerEntity, TrainerRepository> {
  constructor(repository: TrainerRepository, private trainerMapper: TrainerMapper) {
    super(repository);
  }

  async findByEmail(email: string): Promise<TrainerDTO | null> {
    const entity = await this.repository.findOne({ email: email });
    const dto = await this.trainerMapper.mapEntityToDTO(entity);
    return dto;
  }
}
