import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString} from "class-validator";

export class CreateCustDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email of customer, unique',
    minimum: 1,
    type: String,
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Password of customer',
    minimum: 1,
    type: String,

  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'Retype password of customer. must match with password',
    minimum: 1,
    type: String,
  })
  retypePassword: string;
}
