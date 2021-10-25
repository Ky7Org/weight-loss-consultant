import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CampaignEntity} from "./campaign.entity";
import {PackageEntity} from "./package.enttiy";

@Entity('Contract')
export class ContractEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'float'})
  totalPrice: number;
  @Column({ type: 'float'})
  timeOfApproved: number;
  @Column({ type: 'float'})
  timeOfExpired: number;
  @Column({ type: 'float'})
  timeOfCreate: number;
  @Column({ type: 'int'})
  status: number;
  @Column({ type: 'varchar', length: 1000 })
  paymentMethod: string;

  @ManyToOne(() => CampaignEntity, campaign => campaign.contracts)
  campaign: CampaignEntity;
  @ManyToOne(() => PackageEntity, p => p.contracts)
  package: PackageEntity;

}
