import {TrainerService} from '../trainer.service';
import {TrainerRepository} from "../../repositories/trainer.repository";
import { TrainerMapper } from '../../mappers/trainer.mapper';
import {TrainerDTO} from "../../dtos/trainer.dto";

describe('The TrainerService', () => {
  let trainerService: TrainerService;
  let trainerRepository: TrainerRepository;
  let trainerMapper: TrainerMapper;

  beforeEach(() => {
    trainerRepository = new TrainerRepository();
    trainerMapper = new TrainerMapper();

    trainerService = new TrainerService(trainerRepository, trainerMapper);
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
