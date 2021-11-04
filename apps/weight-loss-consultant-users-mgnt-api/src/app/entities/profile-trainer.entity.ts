import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TrainerEntity } from './trainer.entity';
import { TrainerStyleEntity } from './trainer-style.entity';

@Entity("ProfileStyle")
export class ProfileStyleEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TrainerEntity, trainer => trainer.profileStyles)
  trainer: TrainerEntity;
  @ManyToOne(() => TrainerStyleEntity, trainerStyle => trainerStyle.profileStyles)
  style: TrainerStyleEntity;
}
