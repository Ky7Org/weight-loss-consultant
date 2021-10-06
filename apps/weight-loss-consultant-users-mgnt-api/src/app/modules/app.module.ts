import {DynamicModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {AdminEntity} from "../entities/admin.entity";
import {AdminModule} from "./admin.module";
import { TrainerEntity } from '../entities/trainer.entity';
import {TrainerModule} from "./trainer.module";
import {CustomerModule} from "./customer.module";
import {CustomerEntity} from "../entities/customer.entity";
import { ENV_FILE_PATH } from '../constants/env-file-path';
import {CampaignEntity} from "../entities/campaign.entity";
import {PackageEntity} from "../entities/package.enttiy";
import {CampaignModule} from "./campaign.module";
import {PackageModule} from "./package.module";
import {SortingAndFilteringModule} from "./sorting-filtering.module";
import {SearchModule} from "./search.module";


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
        CampaignModule,
        PackageModule,
        SortingAndFilteringModule,
        SearchModule
      ],
    };
  }
}
