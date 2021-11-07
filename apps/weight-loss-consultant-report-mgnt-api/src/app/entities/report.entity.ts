import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ContractEntity} from "./contract.entity";
import {ReportMediaEntity} from "./report-media.entity";

@Entity('Report')
export class ReportEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type: 'varchar'})
  exerciseDescription: string;
  @Column({type: 'varchar'})
  dietDescription: string;
  @Column({type: 'varchar'})
  trainerFeedback: string;
  @Column({type: 'int'})
  trainerApproval: number;
  @Column({type: 'int'})
  weight: number;
  @Column({type: 'bigint'})
  createDate: number;
  @ManyToOne(() => ContractEntity, contract => contract.reports)
  contract: ContractEntity;
  @OneToMany(() => ReportMediaEntity, media => media.report)
  medias: ReportMediaEntity[];

}
