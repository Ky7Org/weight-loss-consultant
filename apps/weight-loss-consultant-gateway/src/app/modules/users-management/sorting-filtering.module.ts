import {Module} from '@nestjs/common';
import {ClientsModule} from '@nestjs/microservices';
import {USERS_MANAGEMENT_SERVICE_NAME} from '../../../../../../constant';
import {SortingAndFilteringController} from '../../controllers/users-management/sorting-filtering.controller';
import {USERS_MANAGEMENT_GRPC_SERVICE} from "../../../../../common/grpc-services.route";


@Module({
  imports: [ClientsModule.register([
    {
      name: USERS_MANAGEMENT_SERVICE_NAME,
      ...USERS_MANAGEMENT_GRPC_SERVICE,
    }])],
  controllers: [SortingAndFilteringController],
  providers: [],
  exports: []
})
export class SortingAndFilteringModule {}
