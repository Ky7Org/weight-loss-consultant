import { DynamicModule, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer.module';
import { AppController } from '../controllers/app.controller';
import { AuthenticationModule } from './authentication.module';
import { TrainerModule } from './trainer.module';
import { TrainerEntity } from '../entities/trainer.entity';
import { CustomerEntity } from '../entities/customer.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from './mail.module';
import { ResetPasswordTokenEntity } from '../entities/reset-password-token.entity';
import { ResetPasswordTokenModule } from './reset-password-token.module';
import { AccountModule } from './account.module';
import { AdminModule } from './admin.module';
import { AdminEntity } from '../entities/admin.entity';
import * as Joi from 'joi';


export class AppModule {
  static forRoot(settings): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: "apps/weight-loss-consultant-authentication/src/.env",
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
            entities: [CustomerEntity, TrainerEntity, ResetPasswordTokenEntity, AdminEntity],
          }),
          inject: [ConfigService],
        }),
        CustomerModule,
        AuthenticationModule,
        TrainerModule,
        AdminModule,
        MailModule,
        ResetPasswordTokenModule,
        AccountModule
      ],
      controllers: [AppController]
    };
  }
}
