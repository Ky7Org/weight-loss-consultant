import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany, ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import {PackageEntity} from "./package.entity";
import {TrainerEntity} from "./trainer.entity";
import {ProfileStyleEntity} from "./profile-trainer.entity";
// import {ProfileStyleEntity} from "./profile-trainer.entity";
// import {TrainerStyleEntity} from "./trainer-style.entity";


@Entity("TrainerStyle")
export class TrainerStyleEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 2000 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  description : string;

  @OneToMany(() => ProfileStyleEntity, profileStyle => profileStyle.style)
  profileStyles: ProfileStyleEntity[];

}
