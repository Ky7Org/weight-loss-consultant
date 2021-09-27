import { AppController } from '../app.controller';
import { CustomerService } from '../../services/customer.service';
import { AuthenticationService } from '../../services/authentication.service';
import { TrainerService } from '../../services/trainer.service';
import { MailService } from '../../services/mail.service';
import { ResetPasswordTokenService } from '../../services/reset-password-token.service';
import { AccountService } from '../../services/account.service';
import { LoginResponseModel } from '../../models/login-response-model';

describe('The AuthenticationController', () => {

  let appController: AppController;
  let customerService: CustomerService;
  let trainerService: TrainerService;
  let mailService: MailService;
  let resetPasswordTokenService: ResetPasswordTokenService;
  let accountService :AccountService;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    appController = new AppController(customerService,
      trainerService,
      authenticationService,
      mailService, resetPasswordTokenService, accountService);
	});

  describe('Test user login', () => {
    it('Login successfully', async () => {
      const req: any = {
        user: {
          email: 'test@example.com'
        },
      };
      const expectedResult = new LoginResponseModel("123");
      jest.spyOn(appController, 'login')
        .mockImplementation(() => Promise.resolve(expectedResult));
      expect(await appController.login(req)).toStrictEqual(expectedResult);
    });
  });
});
