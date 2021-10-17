import {Module} from '@nestjs/common';

import {ClientsModule} from '@nestjs/microservices';
import {USERS_MANAGEMENT_SERVICE_NAME} from '../../../../../../constant';
import {CustomerController} from '../../controllers/users-management/customer.controller';
import {USERS_MANAGEMENT_GRPC_SERVICE} from "../../../../../common/grpc-services.route";


@Module({
  imports: [
    ClientsModule.register([
    {
      name: USERS_MANAGEMENT_SERVICE_NAME,
      ...USERS_MANAGEMENT_GRPC_SERVICE,
    }])
  ],
  controllers: [CustomerController],
  providers: [],
  exports: []
})
export class CustomerModule {
}
