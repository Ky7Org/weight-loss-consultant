import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {CampaignEntity} from "./campaign.entity";
import {PackageEntity} from "./package.enttiy";
import {boolean} from "yup";

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
  @Column({ type: 'tinyint'})
  isTrainerCancel: number;
  @Column({ type: 'tinyint'})
  isCustomerCancel: number;

  @ManyToOne(() => CampaignEntity, campaign => campaign.contracts)
  campaign: CampaignEntity;
  @ManyToOne(() => PackageEntity, p => p.contracts)
  package: PackageEntity;

}
