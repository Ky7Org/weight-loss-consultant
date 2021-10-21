import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {CampaignEntity} from "./campaign.entity";
import {PackageEntity} from "./package.entity";

@Entity('PackageApplyToCampaign')
export class AppliedEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CampaignEntity, campaign => campaign.applies)
  campaign: CampaignEntity

  @ManyToOne(() => PackageEntity, p => p.applies)
  package: PackageEntity

}
