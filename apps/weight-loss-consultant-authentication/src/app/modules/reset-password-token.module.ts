import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ResetPasswordTokenRepository} from '../repositories/reset-password-token.repository';
import {ResetPasswordTokenService} from '../services/reset-password-token.service';
import {ResetPasswordTokenMapper} from '../mappers/reset-password-token.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([ResetPasswordTokenRepository])],
  providers: [ResetPasswordTokenService, ResetPasswordTokenMapper],
  exports: [ResetPasswordTokenService, ResetPasswordTokenMapper],
})
export class ResetPasswordTokenModule{}
