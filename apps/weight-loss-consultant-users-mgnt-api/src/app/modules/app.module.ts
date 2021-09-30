import { DynamicModule, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {AdminEntity} from "../entities/admin.entity";
import {AdminModule} from "./admin.module";
import {AdminController} from "../controllers/admin.controller";
import { TrainerEntity } from '../entities/trainer.entity';
import {TrainerModule} from "./trainer.module";
import {CustomerModule} from "./customer.module";
import {CustomerEntity} from "../entities/customer.entity";
import { ENV_FILE_PATH } from '../constants/env-file-path';
import {CampaignEntity} from "../../../../weight-loss-consultant-packages-mgnt-api/src/app/entities/campaign.entity";
import {AuthModule} from "../auth/auth.module";
import {CampaignModule} from "../../../../weight-loss-consultant-packages-mgnt-api/src/app/modules/campaign.module";
import {PackageEntity} from "../../../../weight-loss-consultant-packages-mgnt-api/src/app/entities/package.enttiy";
import {PackageModule} from "../../../../weight-loss-consultant-packages-mgnt-api/src/app/modules/package.module";

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
              AdminEntity,
              TrainerEntity,
              CustomerEntity,
              CampaignEntity,
              PackageEntity
            ],
          }),
          inject: [ConfigService],
        }),
        AdminModule,
        TrainerModule,
        CustomerModule,
        AuthModule,
        CampaignModule,
        PackageModule
      ],
    };
  }
}
