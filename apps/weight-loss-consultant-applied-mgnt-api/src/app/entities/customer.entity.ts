import {BaseEntity, Column, Entity, Index, OneToMany, PrimaryColumn} from 'typeorm';
import { CampaignEntity } from './campaign.entity';

@Entity('Customer')
export class CustomerEntity extends BaseEntity{
  @PrimaryColumn({ type: 'varchar', length: 320})
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
  @Column({ type: 'int', default: 1 , nullable: false })
  status: number;
  @Column({type: 'varchar', length: 200})
  profileImage: string;
  @Column({type: 'bigint'})
  dob: number;
  @Column({type: 'varchar'})
  deviceID: string;

  @OneToMany(() => CampaignEntity, campaign => campaign.customer )
  campaigns: CampaignEntity[];

}
