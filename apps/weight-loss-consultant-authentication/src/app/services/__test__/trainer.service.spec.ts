import { TrainerService } from '../trainer.service';
import { TrainerRepository } from '../../repositories/trainer.repository';
import { TrainerMapper } from '../../mappers/trainer.mapper';
import { TrainerDTO } from '../../dtos/trainer.dto';
import { RedisCacheService } from '../redis-cache.service';

describe('The TrainerService', () => {
  let trainerService: TrainerService;
  let trainerRepository: TrainerRepository;
  let trainerMapper: TrainerMapper;
  let redisCacheService: RedisCacheService;
  beforeEach(() => {
    trainerRepository = new TrainerRepository();
    trainerMapper = new TrainerMapper();
    redisCacheService = new RedisCacheService(null);

    trainerService = new TrainerService(trainerRepository, trainerMapper, redisCacheService);
  });

  describe('findByEmail', () => {
    it('should return a trainer successfully', async () => {
      const email = "bangmaple@gmail.com";
      const expectedResult = new TrainerDTO();
      jest.spyOn(trainerService, 'findByEmail').mockImplementation(() => Promise.resolve(expectedResult));
      expect(await trainerService.findByEmail(email)).toStrictEqual(expectedResult);
    });
    it('should return a nulled trainer when email not found', async () => {
      const email = "abc@test.com";
      const expectedResult = null;
      jest.spyOn(trainerService, 'findByEmail').mockImplementation(() => Promise.resolve(null));
      expect(await trainerService.findByEmail(email)).toStrictEqual(expectedResult);
    })
  });
});
