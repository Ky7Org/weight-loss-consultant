import {EntityRepository, Repository} from 'typeorm';
import {ResetPasswordTokenEntity} from '../entities/reset-password-token.entity';

@EntityRepository(ResetPasswordTokenEntity)
export class ResetPasswordTokenRepository extends Repository<ResetPasswordTokenEntity> {

}
