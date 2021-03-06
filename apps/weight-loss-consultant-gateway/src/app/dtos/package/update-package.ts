import { ApiProperty } from '@nestjs/swagger';

export class UpdatePackageDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  exercisePlan?:string;
  @ApiProperty()
  schedule: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  trainerEmail: string;
  @ApiProperty()
  status: number;
  @ApiProperty()
  dietPlan?: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  spendTimeToTraining?: number;
  @ApiProperty()
  sessionLength?: number;
  @ApiProperty()
  startDate: number;
  @ApiProperty()
  endDate: number;
}
