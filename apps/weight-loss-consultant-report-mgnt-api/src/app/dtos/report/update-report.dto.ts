import {ApiProperty} from "@nestjs/swagger";

export class UpdateReportDto {
  @ApiProperty()
  contractID: number;
  @ApiProperty()
  date: number;
  @ApiProperty()
  exerciseDescription?: string;
  @ApiProperty()
  dietDescription?: string;
  @ApiProperty()
  trainerFeedback?: string;
  @ApiProperty()
  trainerApproval?: number;
  @ApiProperty()
  weight: number;
}
