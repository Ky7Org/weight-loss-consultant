import { AccountDTO } from './acount.dto';

export class AdminDTO extends AccountDTO {
  address?: string;
  phone?: string;
  gender?: string;
  dob?: number;
  profileImage?: string;
}
