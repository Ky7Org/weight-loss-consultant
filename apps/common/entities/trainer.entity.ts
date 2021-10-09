import {PackageEntity} from "./package.entity";

export class TrainerEntity{
  email: string;
  password: string;
  fullname: string;
  address: string;
  phone: string;
  gender: string;
  status: number;
  profileImage: string;
  dob: number;
  yearOfExp: number;
  rating: number;
  packages: PackageEntity[];
}
