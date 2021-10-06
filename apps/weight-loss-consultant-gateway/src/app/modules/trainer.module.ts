import { Module } from '@nestjs/common';
import { TrainerService } from '../services/trainer.service';
import { TrainerController } from '../controllers/users-management/trainer.controller';


@Module({
  imports: [],
  controllers: [TrainerController],
  providers: [TrainerService],
  exports: [TrainerService]
})
export class TrainerModule {}
