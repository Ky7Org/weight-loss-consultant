import { AdminService } from '../impl/admin.service.impl';
import { AdminRepository } from '../../repositories/admin.repository';
import { RedisCacheService } from '../redis-cache.service';
import { adminDtos, adminEntities } from '../../controllers/__test__/admin.mock';

describe('The AdminService of Users Management Service', () => {
  let adminService: AdminService;
  let adminRepository: AdminRepository;
  let redisCacheService: RedisCacheService;

  beforeEach(async () => {
    adminRepository = new AdminRepository();
    redisCacheService = new RedisCacheService(null);
    adminService = new AdminService(adminRepository, redisCacheService);
  })

  describe('findAll method', () => {
    it('should return array of admin users successfully', async () => {
      jest.spyOn(redisCacheService, 'get').mockImplementation(() => Promise.resolve(adminEntities));
      expect(adminDtos).toEqual(await adminService.findAll());
    });
  })
})
