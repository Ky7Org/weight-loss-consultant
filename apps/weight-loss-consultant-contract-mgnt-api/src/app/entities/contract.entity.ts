import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {CampaignEntity} from "./campaign.entity";
import {PackageEntity} from "./package.enttiy";

@Entity('Contract')
export class ContractEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'float'})
  total: number;
  @Column({ type: 'float'})
  dateOfPurchase: number;
  @Column({ type: 'varchar', length: 1000 })
  paymentMethod: string;

  @ManyToOne(() => CampaignEntity, campaign => campaign.contracts)
  campaign: CampaignEntity;
  @ManyToOne(() => PackageEntity, p => p.contracts)
  package: PackageEntity;

}
