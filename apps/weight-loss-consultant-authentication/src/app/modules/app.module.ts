import { DynamicModule, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer.module';
import { AppController } from '../controllers/app.controller';
import { AuthenticationModule } from './authentication.module';
import { TrainerModule } from './trainer.module';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { TrainerEntity } from '../entities/trainer.entity';
import { CustomerEntity } from '../entities/customer.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

export class AppModule {
  static forRoot(settings): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: "apps/weight-loss-consultant-authentication/src/.env"
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
            entities: [CustomerEntity, TrainerEntity],
          }),
          inject: [ConfigService],
        }),
        CustomerModule,
        AuthenticationModule,
        TrainerModule
      ],
      controllers: [AppController]
    };
  }
}
