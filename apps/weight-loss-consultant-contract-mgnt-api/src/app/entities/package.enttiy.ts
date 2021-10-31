import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
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

  @Column({type: 'float', nullable: false})
  spendTimeToTraining: number;

  @Column({type: 'varchar'})
  trainerEmail: string;

  @Column({type: 'int'})
  sessionLength: number;

  @Column({type: 'bigint'})
  createDate: number;

  @Column({type: 'bigint'})
  startDate: number;

  @Column({type: 'bigint'})
  endDate: number;

  @OneToMany(() => ContractEntity, contract => contract.package)
  contracts : PackageEntity[];

}
