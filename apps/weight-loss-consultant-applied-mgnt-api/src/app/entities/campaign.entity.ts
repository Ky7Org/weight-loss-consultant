import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {AppliedEntity} from "./applied.entity";

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

  @OneToMany(() => AppliedEntity, applied => applied.campaign)
  applies: AppliedEntity[];

}
