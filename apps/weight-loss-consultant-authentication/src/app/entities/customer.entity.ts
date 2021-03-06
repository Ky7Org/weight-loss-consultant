import {BaseEntity, Column, Entity, Index, PrimaryColumn} from 'typeorm';
import { Status } from '../../constant';


@Entity('Customer')
export class CustomerEntity extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 320 })
  email: string;
  @Column({ type: 'varchar', length: 60 })
  password: string;
  @Column({ type: 'varchar', length: 200 })
  fullname: string;
  @Column({ type: 'varchar', length: 200 })
  address: string;
  @Index()
  @Column({ type: 'char', length: 11 })
  phone: string;
  @Column({ type: 'varchar', length: 20 })
  gender: string;
  @Column({ type: 'int' })
  status: Status;
  @Column({ type: 'varchar', length: 320 })
  profileImage: string;
  @Column('bigint')
  dob: number;
}
