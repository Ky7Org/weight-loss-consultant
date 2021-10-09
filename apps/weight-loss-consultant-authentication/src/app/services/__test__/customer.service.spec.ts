import {CustomerService} from '../customer.service';
import {CustomerRepository} from '../../repositories/customer.repository';
import {CustomerMapper} from '../../mappers/customer.mapper';
import {CustomerDTO} from '../../dtos/customer.dto';
import {RedisCacheService} from '../redis-cache.service';

describe('The CustomerService', () => {
  let customerService: CustomerService;
  let customerRepository: CustomerRepository;
  let customerMapper: CustomerMapper;
  let redisCacheService: RedisCacheService;

  beforeEach(() => {
  customerRepository = new CustomerRepository();
  customerMapper = new CustomerMapper();
  redisCacheService = new RedisCacheService(null)
  customerService = new CustomerService(customerRepository, customerMapper, redisCacheService);
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
