import { AccountDTO } from './acount.dto';

export class TrainerDTO extends AccountDTO {
  address?: string;
  phone?: string;
  gender?: string;
  status?: number;
  dob?: number;
  yearOfExp?: number;
  rating?: number;
}
