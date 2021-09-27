import { AccountDTO } from './acount.dto';

export class CustomerDTO extends AccountDTO {
  address?: string;
  phone?: string;
  gender?: string;
  dob?: number;
  profileImage?: string;
}
