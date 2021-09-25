import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordRequestModel{
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}




