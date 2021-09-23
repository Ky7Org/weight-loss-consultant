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

  async findByEmail(email: string): Promise<TrainerDTO> {
    const entity = await this.repository.findOneOrFail({ email: email });
    const dto = await this.trainerMapper.mapEntityToDTO(entity);
    return dto;
  }
}
