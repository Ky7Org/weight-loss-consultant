import { DynamicModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_FILE_PATH } from '../constants/env-file-path';
import { PackageEntity } from '../entities/package.enttiy';
import { PackageModule } from './package.module';
import { TrainerEntity } from '../entities/trainer.entity';

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
              PackageEntity,
              TrainerEntity,
            ],
          }),
          inject: [ConfigService],
        }),
        PackageModule,
      ],
    };
  }
}
