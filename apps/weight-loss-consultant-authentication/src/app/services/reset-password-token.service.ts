import {Injectable, Logger} from '@nestjs/common';
import {ResetPasswordTokenEntity} from '../entities/reset-password-token.entity';
import {ResetPasswordTokenRepository} from '../repositories/reset-password-token.repository';
import {ResetPasswordTokenMapper} from '../mappers/reset-password-token.mapper';
import {ResetPasswordTokenDTO} from '../dtos/reset-password-token.dto';
import {BaseService} from "../../../../common/services/base.service";

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
    return this.resetPasswordTokenMapper.mapEntityToDTO(entity);
  }
}
