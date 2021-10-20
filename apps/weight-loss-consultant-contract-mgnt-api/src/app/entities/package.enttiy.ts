import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CampaignEntity} from "../../../../weight-loss-consultant-health-mgnt-api/src/app/entities/campaign.entity";
import {ContractEntity} from "./contract.entity";

@Entity('Package')
export class PackageEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1000 })
  exercisePlan: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  schedule: string;

  @Column({type: 'float', nullable: false})
  price: number;

  @Column({type: 'int', nullable: false})
  status: number;

  @Column({type: 'varchar', nullable: false})
  dietPlan: string;

  @ManyToOne(() => ContractEntity, contract => contract.campaign)
  contracts : ContractEntity[];

}
