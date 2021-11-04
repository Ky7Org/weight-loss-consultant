import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { ContractEntity } from './contract.entity';
import { AppliedEntity } from './applied.entity';

@Entity('Campaign')
export class CampaignEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 1000 })
  description: string;
  @Column({ type: 'int', nullable: false })
  status: number;
  @Column({type: 'bigint'})
  startDate: number;
  @Column({type: 'bigint'})
  endDate: number;
  @Column({ type: 'varchar', length: 1000 })
  feedback: string;
  @Column({ type: 'float'})
  targetWeight: number;
  @Column({ type: 'float'})
  currentWeight: number;
  @Column({ type: 'float'})
  spendTimeForTraining: number;
  @Column({ type: 'float'})
  createDate: number;
  @ManyToOne(() => CustomerEntity, customer => customer.campaigns)
  customer : CustomerEntity;

  @ManyToOne(() => ContractEntity, contract => contract.campaign)
  contracts : ContractEntity[];

  @OneToMany(() => AppliedEntity, applied => applied.campaign)
  applies: AppliedEntity[];

}
