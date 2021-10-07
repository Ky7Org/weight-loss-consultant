import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordConfirmRequestModel{
  @ApiProperty()
  email: string;

  @ApiProperty()
  otp: string;

  @ApiProperty()
  newPassword: string;

  @ApiProperty()
  confirmNewPassword: string;
}
