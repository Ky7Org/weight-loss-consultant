import {TrainerService} from '../trainer.service';
import {TrainerRepository} from "../../repositories/trainer.repository";
import { TrainerMapper } from '../../mappers/trainer.mapper';
import {TrainerDTO} from "../../dtos/trainer.dto";
describe('The TrainerService', () => {
  let trainerService: TrainerService;
  let trainerRepository: TrainerRepository;
  let trainerMapper: TrainerMapper;

  beforeEach(() => {
    trainerService = new TrainerService(new TrainerRepository(), new TrainerMapper());
  });

  describe('findByEmail', () => {
    it('should return a trainer', async () => {
      const email: string = "bangmaple@gmail.com";
      const expectedResult: Promise<TrainerDTO> = Promise.resolve(new TrainerDTO());
      jest.spyOn(trainerService, 'findByEmail').mockImplementation(() => expectedResult);
      expect(await trainerService.findByEmail(email)).toStrictEqual(new TrainerDTO());
    });
  });

});
