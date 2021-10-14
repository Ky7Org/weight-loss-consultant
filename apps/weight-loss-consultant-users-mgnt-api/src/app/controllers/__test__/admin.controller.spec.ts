import { AdminController } from '../admin.controller';
import { AdminService } from '../../services/impl/admin.service.impl';
import { lastValueFrom } from 'rxjs';
import { adminDtos } from './admin.mock';
import { AdminDto } from '../../dtos/admin/admin.dto';
import { EmailBody } from '../../../../../common/proto-models/users-mgnt.proto';
/*
*     const moduleRef = await Test.createTestingModule({
      imports: [
        RedisCacheModule,
        AutomapperModule.forRoot({
          options: [{ name: 'classMapper', pluginInitializer: classes }],
          singular: true
        })
      ],
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(AdminEntity),
          useClass: AdminRepository,
        }
      ],
      exports: [AdminService],
      controllers: [AdminController],
    }).compile();
    adminService = moduleRef.get(AdminService);
    adminController = moduleRef.get(AdminController);
    adminRepository = moduleRef.get(AdminRepository);
    redisCacheService = moduleRef.get(getRepositoryToken(AdminEntity));
    mapper = moduleRef.get<Mapper>('Mapper');
* */


describe('The AdminController of Users Management Service', () => {
  let adminController: AdminController;
  let adminService: AdminService;

  beforeEach(async () => {
      adminService = new AdminService(null, null, null);
      adminController = new AdminController(adminService);
  });

  describe('index method', () => {
    it('should successfully returns data of admin users', async () => {
      jest.spyOn(adminService, 'findAll').mockImplementation(() => Promise.resolve(adminDtos));
      const actualResult = await lastValueFrom(adminController.index());
      expect(adminDtos).toEqual(actualResult.data);
    });
    it('should successfuly returns empty data of admin users', async () => {
      jest.spyOn(adminService, 'findAll').mockImplementation(() => Promise.resolve([]));
      const expected: AdminDto[] = [];
      const actualResult = await lastValueFrom(adminController.index());
      expect(expected).toEqual(actualResult.data);
    })
  });

  describe('viewDetail method', () => {
    it('should successfully returns data of admin user', async () => {
      const payload: EmailBody = {
        email: 'test@gmail.com',
      };
      const adminDto: AdminDto = adminDtos[0];
      jest.spyOn(adminService, 'viewDetail').mockImplementation(() => Promise.resolve(adminDto));
      const actualResult = await lastValueFrom(adminController.viewDetail(payload));
      expect(adminDto).toEqual(actualResult.data);
    })
  })
});
