import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CampaignEntity} from "./campaign.entity";
import {PackageEntity} from "./package.entity";
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

  @ManyToOne(() => CampaignEntity, campaign => campaign.contracts)
  campaign: CampaignEntity;
  @ManyToOne(() => PackageEntity, p => p.contracts)
  package: PackageEntity;
  @OneToMany(() => ReportEntity, report => report.contract)
  reports: ReportEntity[];

}
