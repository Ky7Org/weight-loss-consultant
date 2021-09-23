import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from '../services/mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        secure: false,
        auth: {
          user: "weight.loss.consultant.swd.391@gmail.com",
          pass: "ky7123abc"
        }
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',

      },
      template: {
        dir: 'apps/weight-loss-consultant-authentication/src/app/mail-template',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    })
  ],
  providers: [
    MailService
  ],
  exports: [
    MailService
  ]
})
export class MailModule{

}
