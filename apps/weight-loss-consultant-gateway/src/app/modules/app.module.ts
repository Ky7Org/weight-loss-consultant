import {Module} from "@nestjs/common";
import {AppController} from "../controllers/app.controller";
import {AppService} from "../services/app.service";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {ConfigModule} from "@nestjs/config";
import {HealthCheckModule} from "./health-check.module";
import {
  AUTHENTICATION_SERVICE_NAME,
  AUTHENTICATION_SERVICE_PORT,
  HEALTH_MANAGEMENT_SERVICE_NAME,
  HEALTH_MANAGEMENT_SERVICE_PORT,
  HOST,
  PACKAGES_MANAGEMENT_SERVICE_NAME,
  PACKAGES_MANAGEMENT_SERVICE_PORT,
  SCHEDULING_SERVICE_NAME, SCHEDULING_SERVICE_PORT,
  USERS_MANAGEMENT_SERVICE_NAME,
  USERS_MANAGEMENT_SERVICE_PORT
} from "../../../../../constant";
import { AdminController } from "../controllers/admin.controller";
import {AdminService} from "../services/admin.service";
import {CustomerController} from "../controllers/customer.controller";
import {CustomerService} from "../services/customer.service";
import { RouterModule, Routes } from 'nest-router';

const routes: Routes = [

];

@Module({
  imports: [
    HealthCheckModule,
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: AUTHENTICATION_SERVICE_NAME,
        transport: Transport.TCP,
        options: {
          host: HOST,
          port: AUTHENTICATION_SERVICE_PORT,
        }
      },
      {
        name: USERS_MANAGEMENT_SERVICE_NAME,
        transport: Transport.TCP,
        options: {
          host: HOST,
          port: USERS_MANAGEMENT_SERVICE_PORT
        }
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
    ])
  ],
  controllers: [AppController, AdminController, CustomerController],
  providers: [AppService, AdminService, CustomerService],
})
export class AppModule {}
