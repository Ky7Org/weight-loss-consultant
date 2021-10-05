import { Injectable, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_CONFIG } from '../constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from '../author/roles.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_SERVICE_NAME, AUTHENTICATION_SERVICE_PORT, HOST } from '../../../../../constant';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from '../controllers/authentication/authentication.controller';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Module({
  imports: [
    PassportModule,
    ClientsModule.register([
      {
        name: AUTHENTICATION_SERVICE_NAME,
        transport: Transport.TCP,
        options: {
          host: HOST,
          port: AUTHENTICATION_SERVICE_PORT
        }
      }]),
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

  providers: [JwtStrategy,  ConfigService,
    AuthenticationService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard }],
  exports: [AuthenticationService],
  controllers: [AuthenticationController]
})
export class AppJwtModule {
}
