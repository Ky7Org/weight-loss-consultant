import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {AppliedEntity} from "./applied.entity";

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
  spendTimeToTraining: string;

  @Column({type: 'varchar'})
  name: string;

  @OneToMany(() => AppliedEntity, applied => applied.package)
  applies: AppliedEntity[];

}
