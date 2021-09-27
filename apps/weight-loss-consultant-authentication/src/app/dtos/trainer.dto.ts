import { AccountDTO } from './acount.dto';

export class TrainerDTO extends AccountDTO {
  address?: string;
  phone?: string;
  gender?: string;
  profileImage?: string;
  dob?: number;
  yearOfExp?: number;
  rating?: number;
}
