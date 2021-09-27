import { BaseService } from './base/base.service';
import { TrainerEntity } from '../entities/trainer.entity';
import { TrainerRepository } from '../repositories/trainer.repository';
import { Injectable } from '@nestjs/common';
import { TrainerMapper } from '../mappers/trainer.mapper';
import { TrainerDTO } from '../dtos/trainer.dto';
import { RedisCacheService } from './redis-cache.service';

@Injectable()
export class TrainerService extends BaseService<TrainerEntity, TrainerRepository> {
  constructor(repository: TrainerRepository,
              private trainerMapper: TrainerMapper,
              private readonly redisCacheService: RedisCacheService) {
    super(repository);
  }

  async findByEmail(email: string): Promise<TrainerDTO> {
    let dto = await this.redisCacheService.get<TrainerDTO>(email);
    if (dto === null){
      const entity = await this.repository.findOneOrFail({ email: email });
      dto = await this.trainerMapper.mapEntityToDTO(entity);
      await this.redisCacheService.set<TrainerDTO>(email, dto);
    }
    return dto;
  }
}
