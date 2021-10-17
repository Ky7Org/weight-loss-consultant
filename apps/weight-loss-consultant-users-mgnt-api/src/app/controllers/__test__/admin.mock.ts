import { AdminDto } from '../../dtos/admin/admin.dto';
import { AdminEntity } from '../../entities/admin.entity';
import { baseEntity } from '../../utils/test.util';

export const adminDtos: AdminDto[] = [
  {
    email: 'test1@gmail.com',
    dob: 16000000,
    address: 'Vinahouse',
    gender: 'Male',
    fullname: 'Mr. Maple',
    phone: '0123456789',
    password: '123456789',
    profileImage: 'link1',
    status: 1
  },
  {
    email: 'test2@gmail.com',
    dob: 12000000,
    address: 'Banana Tree',
    gender: 'Female',
    fullname: 'Mrs. Maple',
    phone: '0123456789',
    password: '123456789',
    profileImage: 'link2',
    status: 0
  }
];

export const adminEntities: AdminEntity[] = [
  {
    ...baseEntity,
    email: 'test1@gmail.com',
    dob: 16000000,
    address: 'Vinahouse',
    gender: 'Male',
    fullname: 'Mr. Maple',
    phone: '0123456789',
    password: '123456789',
    profileImage: 'link1',
    status: 1
  },
  {
    ...baseEntity,
    email: 'test2@gmail.com',
    dob: 12000000,
    address: 'Banana Tree',
    gender: 'Female',
    fullname: 'Mrs. Maple',
    phone: '0123456789',
    password: '123456789',
    profileImage: 'link2',
    status: 0
  }
];
