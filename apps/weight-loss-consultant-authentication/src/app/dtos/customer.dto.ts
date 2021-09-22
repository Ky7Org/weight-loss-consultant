import { Role } from '../../constant';

export class CustomerDTO {
  email?: string;
  password?: string;
  fullname?: string;
  address?: string;
  phone?: string;
  gender?: string;
  status?: number;
  dob?: number;
  role?: Role
}
