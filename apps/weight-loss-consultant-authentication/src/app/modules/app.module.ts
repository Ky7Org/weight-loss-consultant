import { DynamicModule } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controllers/app.controller';
import { AuthenticationModule } from './authentication.module';
import { TrainerEntity } from '../entities/trainer.entity';
import { CustomerEntity } from '../entities/customer.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from './mail.module';
import { ResetPasswordTokenEntity } from '../entities/reset-password-token.entity';
import { ResetPasswordTokenModule } from './reset-password-token.module';
import { AdminEntity } from '../entities/admin.entity';
import * as Joi from 'joi';
import { ENV_FILE_PATH } from '../../constant';


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
            host: configService.get('DATABASE_HOST'),
            port: configService.get<number>('DATABASE_PORT'),
            username: configService.get('DATABASE_USER'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            entities: [CustomerEntity, TrainerEntity, ResetPasswordTokenEntity, AdminEntity],
          }),
          inject: [ConfigService],
        }),
        AuthenticationModule,
        MailModule,
        ResetPasswordTokenModule,
      ],
      controllers: [AppController]
    };
  }
}
