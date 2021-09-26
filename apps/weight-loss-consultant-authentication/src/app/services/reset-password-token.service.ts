import { Injectable, Logger } from '@nestjs/common';
import { BaseService } from './base/base.service';
import { ResetPasswordTokenEntity } from '../entities/reset-password-token.entity';
import { ResetPasswordTokenRepository } from '../repositories/reset-password-token.repository';
import { ResetPasswordTokenMapper } from '../mappers/reset-password-token.mapper';
import { ResetPasswordTokenDTO } from '../dtos/reset-password-token.dto';

@Injectable()
export class ResetPasswordTokenService extends BaseService<ResetPasswordTokenEntity, ResetPasswordTokenRepository>{
  private logger = new Logger(ResetPasswordTokenService.name);

  constructor(repository: ResetPasswordTokenRepository, private resetPasswordTokenMapper: ResetPasswordTokenMapper) {
    super(repository);
  }

  async findLatestTokenByEmail(email: string): Promise<ResetPasswordTokenDTO>{
    const entity = await this.repository
      .createQueryBuilder('token')
      .where("token.email = :email", { email: email })
      .orderBy({"token.createdTime": "DESC"})
      .getOneOrFail();
    const dto = this.resetPasswordTokenMapper.mapEntityToDTO(entity);
    return dto;
  }
}
