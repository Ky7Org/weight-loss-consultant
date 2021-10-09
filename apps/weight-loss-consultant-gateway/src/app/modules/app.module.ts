import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {HealthCheckModule} from './health-check.module';
import {
  HEALTH_MANAGEMENT_SERVICE_NAME,
  HEALTH_MANAGEMENT_SERVICE_PORT,
  HOST,
  PACKAGES_MANAGEMENT_SERVICE_NAME,
  PACKAGES_MANAGEMENT_SERVICE_PORT,
  SCHEDULING_SERVICE_NAME,
  SCHEDULING_SERVICE_PORT,
  USERS_MANAGEMENT_SERVICE_NAME
} from '../../../../../constant';
import {TrainerModule} from './users-management/trainer.module';
import {PackageModule} from './packages-management/package.module';
import {AdminModule} from './users-management/admin.module';
import {CustomerModule} from './users-management/customer.module';
import {AppJwtModule} from './authentication/auth.module';
import {SearchModule} from './users-management/search.module';
import {SortingAndFilteringModule} from './users-management/sorting-filtering.module';
import {USERS_MANAGEMENT_GRPC_SERVICE} from "../../../../common/grpc-services.route";
import {CampaignModule} from "./campaigns-management/campaign.module";

@Module({
  imports: [
    AppJwtModule,
    AdminModule,
    TrainerModule,
    PackageModule,
    CampaignModule,
    CustomerModule,
    HealthCheckModule,
    SearchModule,
    SortingAndFilteringModule,
    ClientsModule.register([
      {
        name: USERS_MANAGEMENT_SERVICE_NAME,
        ...USERS_MANAGEMENT_GRPC_SERVICE,
      },
      {
        name: PACKAGES_MANAGEMENT_SERVICE_NAME,
        transport: Transport.TCP,
        options: {
          host: HOST,
          port: PACKAGES_MANAGEMENT_SERVICE_PORT,
        }
      },

      {
        name: HEALTH_MANAGEMENT_SERVICE_NAME,
        transport: Transport.TCP,
        options: {
          host: HOST,
          port: HEALTH_MANAGEMENT_SERVICE_PORT,
        }
      },
      {
        name: SCHEDULING_SERVICE_NAME,
        transport: Transport.TCP,
        options: {
          host: HOST,
          port: SCHEDULING_SERVICE_PORT,
        }
      }
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
