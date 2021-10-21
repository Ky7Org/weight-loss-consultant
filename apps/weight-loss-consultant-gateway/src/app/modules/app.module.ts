import { DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckModule } from './health-check.module';
import {
  APPLIED_MANAGEMENT_SERVICE_NAME, APPLIED_MANAGEMENT_SERVICE_PORT,
  AUTHENTICATION_SERVICE_NAME,
  AUTHENTICATION_SERVICE_PORT,
  CAMPAIGN_MANAGEMENT_SERVICE_NAME, CAMPAIGN_MANAGEMENT_SERVICE_PORT,
  CONTRACT_MANAGEMENT_SERVICE_NAME, CONTRACT_MANAGEMENT_SERVICE_PORT,
  HEALTH_MANAGEMENT_SERVICE_NAME,
  HEALTH_MANAGEMENT_SERVICE_PORT,
  HOST,
  PACKAGES_MANAGEMENT_SERVICE_NAME,
  PACKAGES_MANAGEMENT_SERVICE_PORT,
  SCHEDULING_SERVICE_NAME,
  SCHEDULING_SERVICE_PORT,
  USERS_MANAGEMENT_SERVICE_NAME,
  USERS_MANAGEMENT_SERVICE_PORT
} from '../../../../../constant';
import { TrainerModule } from './trainer.module';
import { PackageModule } from './package.module';
import { AdminModule } from './admin.module';
import { CampaignModule } from './campaign.module';
import { CustomerModule } from './customer.module';
import { AuthenticationModule } from './auth.module';
import * as Joi from 'joi';
import { ENV_FILE_PATH } from '../constant';
import { SearchModule } from './search.module';
import { SortingAndFilteringModule } from './sorting-filtering.module';
import {ContractModule} from "./contract.module";
import {AppliedModule} from "./apply.module";

export class AppModule {
  static forRoot(settings): DynamicModule {
    return {
      module: AppModule,
      imports: [
        TrainerModule,
        PackageModule,
        AdminModule,
        CampaignModule,
        CustomerModule,
        AuthenticationModule,
        HealthCheckModule,
        SearchModule,
        SortingAndFilteringModule,
        ContractModule,
        AppliedModule,
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
          },
          {
            name: CONTRACT_MANAGEMENT_SERVICE_NAME,
            transport: Transport.TCP,
            options: {
              host: HOST,
              port: CONTRACT_MANAGEMENT_SERVICE_PORT,
            }
          },
          {
            name: CAMPAIGN_MANAGEMENT_SERVICE_NAME,
            transport: Transport.TCP,
            options: {
              host: HOST,
              port: CAMPAIGN_MANAGEMENT_SERVICE_PORT,
            }
          },
          {
            name: APPLIED_MANAGEMENT_SERVICE_NAME,
            transport: Transport.TCP,
            options: {
              host: HOST,
              port: APPLIED_MANAGEMENT_SERVICE_PORT,
            }
          }
        ]),
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ENV_FILE_PATH,
          validationSchema: Joi.object({
            REDIS_HOST: Joi.string().required(),
            REDIS_PORT: Joi.number().required(),
          })
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
