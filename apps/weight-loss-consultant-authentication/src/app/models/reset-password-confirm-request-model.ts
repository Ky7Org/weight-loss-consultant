import { Match } from '../decorators/match.decorator';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordConfirmRequestModel{
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(6, 6)
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @Match("newPassword", {message: "confirmNewPassword mismatch"})
  confirmNewPassword: string;
}
