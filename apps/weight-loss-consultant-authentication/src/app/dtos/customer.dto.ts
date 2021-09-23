import { AccountDTO } from './acount.dto';

export class CustomerDTO extends AccountDTO{
  address?: string;
  phone?: string;
  gender?: string;
  status?: number;
  dob?: number;
}
