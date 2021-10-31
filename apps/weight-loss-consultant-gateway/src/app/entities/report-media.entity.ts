import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ReportEntity} from "./report.entity";

@Entity('ReportMedia')
export class ReportMediaEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type: 'varchar'})
  url: string;
  @Column({type: 'int'})
  type: number;
  @Column({type: 'bigint'})
  createDate: number;
  @ManyToOne(() => ReportEntity, report => report.medias)
  report: ReportEntity;
}
