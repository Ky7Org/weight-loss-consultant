import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CustomerModule} from "../modules/customer.module";
import {TrainerModule} from "../modules/trainer.module";
import {AdminModule} from "../modules/admin.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {JWT_CONFIG} from "../constants/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {AuthMapper} from "./auth.mapper";
import {AuthController} from "./auth.controller";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {RolesGuard} from "../author/roles.guard";

@Module({
  imports: [
    CustomerModule,
    TrainerModule,
    AdminModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: JWT_CONFIG.expireTime
        }
      }),
      inject: [ConfigService]
    })],

  providers: [AuthService, LocalStrategy, JwtStrategy, AuthMapper,
    {provide: APP_GUARD, useClass: JwtAuthGuard},
    {provide : APP_GUARD, useClass: RolesGuard} ],
  exports: [AuthService, AuthMapper],
  controllers: [AuthController]
})
export class AuthModule {
}
