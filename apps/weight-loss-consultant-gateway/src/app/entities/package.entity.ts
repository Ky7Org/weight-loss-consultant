import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TrainerEntity } from './trainer.entity';
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

  @ManyToOne(() => TrainerEntity, trainer => trainer.packages)
  trainer : TrainerEntity;

  @ManyToOne(() => ContractEntity, contract => contract.campaign)
  contracts : ContractEntity[];
}
