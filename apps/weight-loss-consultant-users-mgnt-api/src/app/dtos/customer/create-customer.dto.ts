import * as Validator from "class-validator";
import * as ERR_MSG from "../../constants/validation-err-message";
import * as LIMIT_LENGTH from "../../constants/properties-length-limit";
import {Match} from "../match.decorator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCustDto {
  @Validator.IsString({message: ERR_MSG.EMAIL_FORMAT_ERR})
  @Validator.MinLength(LIMIT_LENGTH.EMAIL_MIN_LENGTH)
  @Validator.MaxLength(LIMIT_LENGTH.EMAIL_MAX_LENGTH, {message: ERR_MSG.EMAIL_MAX_LENGTH_ERR})
  @ApiProperty({
    description: 'Email of customer, unique',
    minimum: 1,
    type: String,
  })
  email: string;

  @Validator.IsString()
  @Validator.IsEmpty({message: ERR_MSG.PASSWORD_EMPTY_ERR})
  @ApiProperty({
    description: 'Password of customer',
    minimum: 1,
    type: String,

  })
  password: string;

  @Validator.IsString()
  @Match('password', {message: ERR_MSG.RETYPE_PASSWORD_VALIDATION_ERR}) //if not match => return status code :400
  @ApiProperty({
    description: 'Retype password of customer. must match with password',
    minimum: 1,
    type: String,
  })
  retypePassword: string;
}
