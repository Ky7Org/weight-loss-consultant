import { Module } from '@nestjs/common';
import { TrainerService } from '../services/trainer.service';
import { TrainerController } from '../controllers/users-management/trainer.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HOST, USERS_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_PORT } from '../../../../../constant';


@Module({
  imports: [ClientsModule.register([
    {
      name: USERS_MANAGEMENT_SERVICE_NAME,
      transport: Transport.TCP,
      options: {
        host: HOST,
        port: USERS_MANAGEMENT_SERVICE_PORT
      }
    }])],
  controllers: [TrainerController],
  providers: [TrainerService],
  exports: [TrainerService]
})
export class TrainerModule {}
