export class ResetPasswordConfirmRequestDto {
  email: string;
  otp: string;
  newPassword: string;
  confirmNewPassword: string;
}
