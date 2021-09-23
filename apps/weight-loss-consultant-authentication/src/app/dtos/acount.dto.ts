import { Role } from '../../constant';

export class AccountDTO{
  email: string;
  password: string;
  fullname?: string;
  role: Role
}
