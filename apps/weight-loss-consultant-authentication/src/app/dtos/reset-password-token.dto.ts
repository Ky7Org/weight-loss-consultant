export class ResetPasswordTokenDTO{
  id: string;
  email: string;
  otp: string;
  expiredTime: number;
  createdTime: number;
  isInvalidated: boolean;
}
