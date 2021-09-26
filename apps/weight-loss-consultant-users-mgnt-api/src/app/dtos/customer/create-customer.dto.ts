import * as ERR_MSG from "../../constants/validation-err-message";
import * as LIMIT_LENGTH from "../../constants/properties-length-limit";
import {Match} from "../match.decorator";
import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreateCustDto {
  @MinLength(LIMIT_LENGTH.EMAIL_MIN_LENGTH)
  @MaxLength(LIMIT_LENGTH.EMAIL_MAX_LENGTH, {message: ERR_MSG.EMAIL_MAX_LENGTH_ERR})
  @IsEmail()
  @ApiProperty({
    description: 'Email of customer, unique',
    minimum: 1,
    type: String,
  })
  email: string;

  @IsString()
  @IsEmpty({message: ERR_MSG.PASSWORD_EMPTY_ERR})
  @ApiProperty({
    description: 'Password of customer',
    minimum: 1,
    type: String,

  })
  password: string;

  @IsString()
  @Match('password', {message: ERR_MSG.RETYPE_PASSWORD_VALIDATION_ERR}) //if not match => return status code :400
  @ApiProperty({
    description: 'Retype password of customer. must match with password',
    minimum: 1,
    type: String,
  })
  retypePassword: string;
}
