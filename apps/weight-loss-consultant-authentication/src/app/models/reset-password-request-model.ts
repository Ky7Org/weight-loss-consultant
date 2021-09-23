import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordRequestModel{
  @IsEmail()
  @IsNotEmpty()
  email: string;
}




