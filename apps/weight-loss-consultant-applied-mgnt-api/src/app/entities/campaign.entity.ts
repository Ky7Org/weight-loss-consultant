import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {AppliedEntity} from "./applied.entity";
import {CustomerEntity} from "./customer.entity";

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
  @Column({ type: 'int'})
  sessionLength: number;
  @OneToMany(() => AppliedEntity, applied => applied.campaign)
  applies: AppliedEntity[];
  @ManyToOne(() => CustomerEntity, customer => customer.campaigns)
  customer : CustomerEntity;
}
