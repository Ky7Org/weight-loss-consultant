import { Role, Status } from '../../constant';

export class AccountDTO{
  email: string;
  password: string;
  fullname?: string;
  role: Role;
  status?: Status
}
