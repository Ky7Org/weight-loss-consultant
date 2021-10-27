import { ApiProperty } from '@nestjs/swagger';

export class CreatePackageDto {
  @ApiProperty()
  exercisePlan?:string;
  @ApiProperty()
  schedule: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  trainerEmail: string;
  @ApiProperty()
  dietPlan?: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  spendTimeToTraining?: number;
}
