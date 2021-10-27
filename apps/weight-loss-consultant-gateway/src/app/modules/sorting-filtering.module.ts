import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HOST, USERS_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_PORT } from '../../../../../constant';
import { SortingAndFilteringController } from '../controllers/users-management/sorting-filtering.controller';
import { SortingAndFilteringService } from '../services/sorting-and-filtering.service';
import {KAFKA_USERS_MANAGEMENT_SERVICE} from "../../../../common/kafka-utils";


@Module({
  imports: [ClientsModule.register([KAFKA_USERS_MANAGEMENT_SERVICE])],
  controllers: [SortingAndFilteringController],
  providers: [SortingAndFilteringService],
  exports: [SortingAndFilteringService]
})
export class SortingAndFilteringModule {}
