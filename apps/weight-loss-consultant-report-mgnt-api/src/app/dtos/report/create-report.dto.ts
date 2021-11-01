import {ApiProperty} from "@nestjs/swagger";

export class CreateReportDto {
  @ApiProperty()
  contractID: number;
  @ApiProperty()
  exerciseDescription?: string;
  @ApiProperty()
  dietDescription?: string;
  @ApiProperty()
  weight: number;
}
