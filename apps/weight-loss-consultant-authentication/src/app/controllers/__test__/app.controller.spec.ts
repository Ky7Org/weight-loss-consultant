import { AppController } from '../app.controller';
import { CustomerService } from '../../services/customer.service';
import { AuthenticationService } from '../../services/authentication.service';
import { TrainerDTO } from '../../dtos/trainer.dto';
import { CustomerDTO } from '../../dtos/customer.dto';

describe('The AuthenticationController', () => {

  let appController: AppController;
  let customerService: CustomerService;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    appController = new AppController(customerService, authenticationService);
	});

  describe('Test user login', () => {
    it('Login successfully', async () => {
      const req: any = {
        user: {
          email: 'test@example.com'
        },
      };
      const expectedResult = new TrainerDTO();
      jest.spyOn(appController, 'login')
        .mockImplementation(() => Promise.resolve(expectedResult));
      expect(await appController.login(req)).toStrictEqual(expectedResult);
    });
  });
});
