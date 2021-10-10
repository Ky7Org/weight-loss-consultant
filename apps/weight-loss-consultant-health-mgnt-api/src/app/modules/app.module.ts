import { DynamicModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {ENV_FILE_PATH} from "../constants/env-file-path";
import {HeathInfoEntity} from "../entities/health-info.entity";
import {CustomerEntity} from "../entities/customer.entity";
import {HealthCheckModule} from "./health-check.module";
import {CampaignEntity} from "../entities/campaign.entity";

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
              HeathInfoEntity,
              CustomerEntity,
              CampaignEntity
            ],
          }),
          inject: [ConfigService],
        }),
        HealthCheckModule,
      ],
    };
  }
}
