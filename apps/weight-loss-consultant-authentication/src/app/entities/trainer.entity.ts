import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { Status } from '../../constant';


@Entity('Trainer')
export class TrainerEntity extends BaseEntity {
  @PrimaryColumn()
  email: string;
  @Column({ type: 'char', length: 60 })
  password: string;
  @Column({ type: 'varchar', length: 200 })
  fullname: string;
  @Column({ type: 'varchar', length: 200 })
  address: string;
  @Column({ type: 'char', length: 11 })
  phone: string;
  @Column({ type: 'varchar', length: 20 })
  gender: string;
  @Column('int')
  status: Status;
  @Column({ type: 'varchar', length: 200 })
  profileImage: string;
  @Column('bigint')
  dob: number;
  @Column('float')
  yearOfExp: number;
  @Column('float')
  rating: number;


}
