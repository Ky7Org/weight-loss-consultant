import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Customer')
export class CustomerEntity extends BaseEntity{
  @PrimaryColumn({ type: 'varchar', length: 320 })
  email: string;
  @Column({ type: 'varchar', length: 60 })
  password: string;
  @Column({ type: 'varchar', length: 200 })
  fullname: string;
  @Column({ type: 'varchar', length: 200 })
  address: string;
  @Column({ type: 'char', length: 11 })
  phone: string;
  @Column({ type: 'varchar', length: 20 })
  gender: string;
  @Column({ type: 'int' })
  status: number;
  @Column('bigint')
  dob: number;
}
