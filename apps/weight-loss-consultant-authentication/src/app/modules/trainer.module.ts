import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainerRepository } from '../repositories/trainer.repository';
import { TrainerService } from '../services/trainer.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrainerRepository])],
  providers: [TrainerService],
  exports: [TrainerService]
})
export class TrainerModule{

}
