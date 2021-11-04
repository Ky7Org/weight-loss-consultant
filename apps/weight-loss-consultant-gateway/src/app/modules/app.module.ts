import { DynamicModule } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckModule } from './health-check.module';
import { PackageModule } from './package.module';
import { CampaignModule } from './campaign.module';
import { AuthenticationModule } from './authentication.module';
import * as Joi from 'joi';
import { ENV_FILE_PATH } from '../constant';
import { ContractModule } from './contract.module';
import { AppliedModule } from './apply.module';
import { ReportModule } from './report.module';
import { UsersManagementModule } from './users-management.module';
import { KAFKA_SERVICE } from '../../../../common/kafka-utils';

export class AppModule {
  static forRoot(settings): DynamicModule {
    return {
      module: AppModule,
      imports: [
        AuthenticationModule,
        UsersManagementModule,
        PackageModule,
        CampaignModule,
        HealthCheckModule,
        ContractModule,
        AppliedModule,
        ReportModule,
        ClientsModule.register([
          {
            ...KAFKA_SERVICE,
            name: 'SERVER',
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
