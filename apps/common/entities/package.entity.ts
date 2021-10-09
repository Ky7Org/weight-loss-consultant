import {TrainerEntity} from "./trainer.entity";

export class PackageEntity {
  id: number;
  exercisePlan: string;
  schedule: string;
  price: number;
  status: number;
  dietPlan: string;
  trainer : TrainerEntity;
}
