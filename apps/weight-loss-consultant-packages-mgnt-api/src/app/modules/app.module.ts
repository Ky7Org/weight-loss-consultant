import { DynamicModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_FILE_PATH } from '../constants/env-file-path';
import {CustomerEntity} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/entities/customer.entity";
import {CampaignEntity} from "../entities/campaign.entity";
import {CustomerModule} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/modules/customer.module";
import {CampaignModule} from "./campaign.module";
import {PackageEntity} from "../entities/package.enttiy";
import {PackageModule} from "./package.module";
import {TrainerEntity} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/entities/trainer.entity";
import {TrainerModule} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/modules/trainer.module";
import {AuthModule} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/auth/auth.module";
import {AdminEntity} from "../../../../weight-loss-consultant-users-mgnt-api/src/app/entities/admin.entity";

export class AppModule {
  static forRoot(settings): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ENV_FILE_PATH
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get('DATABASE_HOST'),
            port: configService.get<number>('DATABASE_PORT'),
            username: configService.get('DATABASE_USER'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            entities: [
              CustomerEntity,
              CampaignEntity,
              PackageEntity,
              TrainerEntity,
              AdminEntity
            ],
          }),
          inject: [ConfigService],
        }),
        CustomerModule,
        CampaignModule,
        PackageModule,
        TrainerModule,
        AuthModule
      ],
    };
  }
}
