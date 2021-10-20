import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import {ContractEntity} from "./contract.entity";

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

  @ManyToOne(() => CustomerEntity, customer => customer.campaigns)
  customer : CustomerEntity;

  @ManyToOne(() => ContractEntity, contract => contract.campaign)
  contracts : ContractEntity[];

}
