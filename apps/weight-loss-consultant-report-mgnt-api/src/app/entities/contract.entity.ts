import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ReportEntity} from "./report.entity";

@Entity('Contract')
export class ContractEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'float'})
  totalPrice: number;
  @Column({ type: 'bigint'})
  timeOfExpired: number;
  @Column({ type: 'bigint'})
  timeOfCreate: number;
  @Column({ type: 'int'})
  status: number;

  @OneToMany(() => ReportEntity, report => report.contract)
  reports: ReportEntity[];

}
