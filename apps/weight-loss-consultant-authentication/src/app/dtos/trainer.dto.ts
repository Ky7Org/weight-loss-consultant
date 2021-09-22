import { Role } from '../../constant';

export class TrainerDTO {
  email?: string;
  password?: string;
  fullname?: string;
  address?: string;
  phone?: string;
  gender?: string;
  status?: number;
  dob?: number;
  yearOfExp?: number;
  rating?: number;
  role?: Role;
}
