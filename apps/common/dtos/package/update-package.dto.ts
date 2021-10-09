export class UpdatePackageDto {
  id: number;
  exercisePlan?:string;
  schedule: string;
  price: number;
  trainerEmail: string;
  status: number;
  dietPlan?: string;
}
