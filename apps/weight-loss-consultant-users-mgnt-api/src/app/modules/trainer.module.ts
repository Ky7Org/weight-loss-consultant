import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerRepository } from '../repositories/trainer.repository';
import { TrainerService } from '../services/impl/trainer.service.impl';
import { TrainerController } from '../controllers/trainer.controller';
import { RedisCacheModule } from './redis-cache.module';


@Module({
  imports: [
    RedisCacheModule,
    TypeOrmModule.forFeature([TrainerRepository])
  ],
  providers: [TrainerService],
  exports: [TrainerService],
  controllers: [TrainerController]
})
export class TrainerModule {

}
