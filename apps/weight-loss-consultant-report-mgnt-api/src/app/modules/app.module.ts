import { DynamicModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_FILE_PATH } from '../constants/env-file-path';
import { ReportEntity } from '../entities/report.entity';
import { ReportMediaEntity } from '../entities/report-media.entity';
import { ReportModule } from './report.module';
import { ContractEntity } from '../entities/contract.entity';


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
              ReportEntity,
              ReportMediaEntity,
              ContractEntity
            ],
          }),
          inject: [ConfigService],
        }),
        ReportModule,
      ],
    };
  }
}
