import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import * as LIMIT_LENGTH from '../../../../../common/constants/properties-length-limit';
import * as ERR_MSG from '../../../../../common/constants/validation-err-message';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustDto {
  @IsEmail()
  @MinLength(LIMIT_LENGTH.EMAIL_MIN_LENGTH, {message: ERR_MSG.EMAIL_FORMAT_ERR})
  @MaxLength(LIMIT_LENGTH.EMAIL_MAX_LENGTH, {message: ERR_MSG.EMAIL_MAX_LENGTH_ERR})
  @ApiProperty({
    description: 'Email of customer. cannot update',
    minimum: 1,
    type: String,

  })
  email?: string;
  @IsString()
  @MinLength(LIMIT_LENGTH.PASSWORD_MIN_LENGTH, {message: ERR_MSG.PASSWORD_MIN_LENGTH_ERR})
  @MaxLength(LIMIT_LENGTH.PASSWORD_MAX_LENGTH, {message: ERR_MSG.PASSWORD_MAX_LENGTH_ERR})
  @ApiProperty({
    description: 'Pasword of customer',
    minimum: 1,
    type: String,

  })
  password?: string;

  @IsString()
  @MinLength(LIMIT_LENGTH.FULLNAME_MIN_LENGTH, {message: ERR_MSG.FULLNAME_EMPTY_ERR})
  @MaxLength(LIMIT_LENGTH.FULLNAME_MAX_LENGTH, {message: ERR_MSG.FULLNAME_MAX_LENGTH_ERR})
  @ApiProperty({
    description: 'Full name of customer',
    minimum: 1,
    type: String,
  })
  fullname?: string;

  @IsString()
  @MinLength(LIMIT_LENGTH.ADDRESS_MIN_LENGTH, {message: ERR_MSG.ADDRESS_EMPTY_ERR})
  @MaxLength(LIMIT_LENGTH.ADDRESS_MAX_LENGTH, {message: ERR_MSG.ADDRESS_MAX_LENGTH_ERR})
  @ApiProperty({
    description: 'Address of customer',
    minimum: 1,
    default: 1,
    type: String,
  })
  address?: string;

  @IsString()
  @MinLength(LIMIT_LENGTH.PHONE_MIN_LENGTH, {message: ERR_MSG.PHONE_MIN_LENGTH_ERR})
  @MaxLength(LIMIT_LENGTH.PHONE_MAX_LENGTH, {message: ERR_MSG.PHONE_MAX_LENGTH_ERR})
  @ApiProperty({
    description: 'Phone of customer',
    minimum: 1,
    type: String,
  })
  phone?: string;
  @IsString()
  @MinLength(LIMIT_LENGTH.GENDER_MIN_LENGTH, {message: ERR_MSG.GENDER_EMPTY_ERR})
  @MaxLength(LIMIT_LENGTH.GENDER_MAX_LENGTH, {message: ERR_MSG.GENDER_VALIDATION_ERR})
  @ApiProperty({
    description: 'Gender of customer',
    minimum: 1,
    type: String,
  })
  gender?: string;


  @IsString()
  @MinLength(LIMIT_LENGTH.PROFILE_MIN_LENGTH, {message: ERR_MSG.PROFILE_IMAGE_EMPTY_ERR})
  @MaxLength(LIMIT_LENGTH.PROFILE_IMAGE_MAX_LENGTH, {message: ERR_MSG.PROFILE_IMAGE_VALIDATION_ERR})
  @ApiProperty({
    description: 'Profile image of customer',
    minimum: 1,
    default: 1,
    type: String,
  })
  profileImage?: string;

  @ApiProperty({
    description: 'Status of customer',
    minimum: 1,
    default: 1,
    type: Number,

  })
  status?: number;
  @ApiProperty({
    description: 'Date of birth of customer',
    minimum: 1,
    default: 1,
    type: Number,
  })
  dob?: number;
}
