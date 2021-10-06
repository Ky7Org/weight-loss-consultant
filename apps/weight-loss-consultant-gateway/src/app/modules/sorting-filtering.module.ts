import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HOST, USERS_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_PORT } from '../../../../../constant';
import { SortingAndFilteringController } from '../controllers/users-management/sorting-filtering.controller';
import { SortingAndFilteringService } from '../services/sorting-and-filtering.service';


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
  controllers: [SortingAndFilteringController],
  providers: [SortingAndFilteringService],
  exports: [SortingAndFilteringService]
})
export class SortingAndFilteringModule {}
