import { DynamicModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ENV_FILE_PATH } from '../../constant';
import {ContractModule} from "./contract.module";
import {ContractController} from "../controllers/contract.controller";
import {CampaignEntity} from "../entities/campaign.entity";
import {ContractEntity} from "../entities/contract.entity";
import {PackageEntity} from "../entities/package.enttiy";


export class AppModule {
  static forRoot(settings): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ENV_FILE_PATH,
          validationSchema: Joi.object({
            REDIS_HOST: Joi.string().required(),
            REDIS_PORT: Joi.number().required(),
          })
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            //logging: ["query"],
            host: configService.get('DATABASE_HOST'),
            port: configService.get<number>('DATABASE_PORT'),
            username: configService.get('DATABASE_USER'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            entities: [
              CampaignEntity,
              PackageEntity,
              ContractEntity
            ],
          }),
          inject: [ConfigService],
        }),
        ContractModule
      ],
      controllers: [ContractController]
    };
  }
}
