import {Injectable} from '@nestjs/common';
import {ResetPasswordTokenEntity} from '../entities/reset-password-token.entity';
import { ResetPasswordTokenDTO } from '../../../../common/dtos/authentication/reset-password-token.dto';

@Injectable()
export class ResetPasswordTokenMapper {
  async mapDTOToEntity(dto: ResetPasswordTokenDTO): Promise<ResetPasswordTokenEntity | null> {
    if (dto === null || dto === undefined) {
      return null;
    }
    const entity = new ResetPasswordTokenEntity();
    entity.id = dto.id;
    entity.email = dto.email;
    entity.otp = dto.otp;
    entity.expiredTime = dto.expiredTime;
    entity.createdTime = dto.createdTime;
    entity.isInvalidated = dto.isInvalidated;
    return entity;

  }

  async mapEntityToDTO(entity: ResetPasswordTokenEntity): Promise<ResetPasswordTokenDTO | null> {
    if (entity === null || entity === undefined) {
      return null;
    }
    const dto = new ResetPasswordTokenDTO();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.otp = entity.otp;
    dto.expiredTime = entity.expiredTime;
    dto.createdTime = entity.createdTime;
    dto.isInvalidated = entity.isInvalidated;
    return dto;
  }
}
