import { Module } from '@nestjs/common';
import { TrainerService } from '../services/users-management/trainer.service';
import { TrainerController } from '../controllers/users-management/trainer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HOST, USERS_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_PORT } from '../../../../../constant';
import {KAFKA_USERS_MANAGEMENT_SERVICE} from "../../../../common/kafka-utils";


@Module({
  imports: [],
  controllers: [TrainerController],
  providers: [TrainerService],
  exports: [TrainerService]
})
export class TrainerModule {}
