import { CustomerService } from '../customer.service';
import { CustomerRepository } from '../../repositories/customer.repository';
import { CustomerMapper } from '../../mappers/customer.mapper';
import { CustomerDTO } from '../../dtos/customer.dto';

describe('The CustomerService', () => {
  let customerService: CustomerService;
  let customerRepository: CustomerRepository;
  let customerMapper: CustomerMapper;

beforeEach(() => {
  customerRepository = new CustomerRepository();
  customerMapper = new CustomerMapper();
  customerService = new CustomerService(customerRepository, customerMapper);
  });

  describe('findByEmail', () => {
    it('should return a customer successfully', async () => {
      const email = "bangmaple@gmail.com";
      const expectedResult = new CustomerDTO();
      jest.spyOn(customerService, 'findByEmail').mockImplementation(() => Promise.resolve(expectedResult));
      expect(await customerService.findByEmail(email)).toStrictEqual(expectedResult);
    });
    it('should return a nulled customer when email not found', async () => {
      const email = "abc@test.com";
      const expectedResult = null;
      jest.spyOn(customerService, 'findByEmail').mockImplementation(() => Promise.resolve(null));
      expect(await customerService.findByEmail(email)).toStrictEqual(expectedResult);
    })
  });
});
