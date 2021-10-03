import {IsEmail, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateTrainerDto{
  @IsEmail()
  @ApiProperty({
    description: 'Email of trainer, unique',
    minimum: 1,
    type: String,
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Password of trainer',
    minimum: 1,
    type: String,

  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'Retype password of trainer. must match with password',
    minimum: 1,
    type: String,
  })
  retypePassword: string;
}
