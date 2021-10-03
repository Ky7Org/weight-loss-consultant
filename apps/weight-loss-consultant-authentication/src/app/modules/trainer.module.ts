import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerRepository } from '../repositories/trainer.repository';
import { TrainerService } from '../services/trainer.service';
import { TrainerMapper } from '../mappers/trainer.mapper';
import { RedisCacheModule } from './redis-cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrainerRepository])
    , RedisCacheModule
  ],
  providers: [TrainerService, TrainerMapper],
  exports: [TrainerService, TrainerMapper]
})
export class TrainerModule {

}
