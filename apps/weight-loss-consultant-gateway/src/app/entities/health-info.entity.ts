import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Entity('HealthInformation')
export class HeathInfoEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'float'})
  weight: number;
  @Column({ type: 'float'})
  height: number;
  @Column({ type: 'varchar', length: 1000 })
  medicalHistory: string;

  @Column({ type: 'varchar', length: 1000 })
  exerciseHabit: string;

  @Column({ type: 'varchar', length: 1000 })
  diet: string;
  @Column({ type: 'bigint'})
  timestamp: number;

  @ManyToOne(() => CustomerEntity, customer => customer.healthInfos)
  customer : CustomerEntity;

}
