import {BaseEntity, Column, Entity, PrimaryColumn} from 'typeorm';

@Entity("ResetPasswordToken")
export class ResetPasswordTokenEntity extends BaseEntity{
  @PrimaryColumn({type: "char", length: 36})
  id: string
  @Column({type: "varchar", length: 320})
  email: string;
  @Column({type: "varchar", length: 6})
  otp: string;
  @Column({type: "bigint"})
  expiredTime: number;
  @Column({type: "bigint"})
  createdTime: number;
  @Column({type: "boolean"})
  isInvalidated: boolean;
}
