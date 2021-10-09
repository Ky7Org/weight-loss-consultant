import {Injectable, Logger} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';

@Injectable()
export class MailService{
  private logger = new Logger(MailerService.name);

  constructor(private mailerService: MailerService) {
  }

  async sendOTPEmail(email: string, otp: string){
    await this.mailerService.sendMail({
      to: email,
      subject: "Reset password",
      template: './reset-password',
      context: {
        email: email,
        otp: otp,
      }
    })
  }
}
