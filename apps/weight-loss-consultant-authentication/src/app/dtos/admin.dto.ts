import { AccountDTO } from './acount.dto';

export class AdminDTO extends AccountDTO {
  address?: string;
  phone?: string;
  gender?: string;
  status?: number;
  dob?: number;
  profileImage?: string;
}
