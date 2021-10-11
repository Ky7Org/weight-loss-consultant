import {Module} from '@nestjs/common';
import {TrainerController} from '../../controllers/users-management/trainer.controller';
import {ClientsModule} from '@nestjs/microservices';
import {USERS_MANAGEMENT_SERVICE_NAME} from '../../../../../../constant';
import {USERS_MANAGEMENT_GRPC_SERVICE} from "../../../../../common/grpc-services.route";

@Module({
  imports: [ClientsModule.register([
    {
      name: USERS_MANAGEMENT_SERVICE_NAME,
      ...USERS_MANAGEMENT_GRPC_SERVICE,
    }])],
  controllers: [TrainerController],
  providers: [],
  exports: []
})
export class TrainerModule {}
