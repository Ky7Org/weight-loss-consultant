import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../dtos/match.decorator';

export class ResetPasswordConfirmRequestModel{
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(6, 6)
  @IsNotEmpty()
  otp: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Match("newPassword", {message: "confirmNewPassword mismatch"})
  confirmNewPassword: string;
}
