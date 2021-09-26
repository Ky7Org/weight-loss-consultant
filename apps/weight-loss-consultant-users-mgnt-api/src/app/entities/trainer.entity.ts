import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";


@Entity("Trainer")
export class TrainerEntity extends BaseEntity {

  @PrimaryColumn({type: 'varchar', length: 320})
  email: string;

  @Column({type: 'char', length: 60})
  password: string;

  @Column({type: 'varchar', length: 200})
  fullname: string;

  @Column({type: 'varchar', length: 200})
  address: string;

  @Column({type: 'char', length: 11})
  phone: string;

  @Column({type: 'varchar', length: 20})
  gender: string;

  @Column({type: 'int', nullable: false})
  status: number;

  @Column({type: 'varchar' , length: 200})
  profileImage: string;

  @Column({type: 'bigint'})
  dob: number;

  @Column({type: 'float', nullable: false})
  yearOfExp: number;

  @Column({type: 'float'})
  rating: number;


}
