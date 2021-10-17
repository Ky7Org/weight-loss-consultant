import { Match } from '../../decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';
import * as LIMIT_LENGTH from '../../../../../common/constants/properties-length-limit';
import * as ERR_MSG from '../../../../../common/constants/validation-err-message';
import { IsEmail, IsEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAdminDto {
  @MinLength(LIMIT_LENGTH.EMAIL_MIN_LENGTH)
  @MaxLength(LIMIT_LENGTH.EMAIL_MAX_LENGTH, {message: ERR_MSG.EMAIL_MAX_LENGTH_ERR})
  @ApiProperty({
    description: 'Email of admin, unique',
    minimum: 1,
    type: String,
  })
  @IsEmail()
  email: string;

  @IsString()
  @IsEmpty({message: ERR_MSG.PASSWORD_EMPTY_ERR})
  @ApiProperty({
    description: 'Password of admin',
    minimum: 1,
    type: String,

  })
  password: string;

  @IsString()
  @Match('password', {message: ERR_MSG.RETYPE_PASSWORD_VALIDATION_ERR}) //if not match => return status code :400
  @ApiProperty({
    description: 'Retype password of admin. must match with password',
    minimum: 1,
    type: String,
  })
  retypePassword: string;

}
