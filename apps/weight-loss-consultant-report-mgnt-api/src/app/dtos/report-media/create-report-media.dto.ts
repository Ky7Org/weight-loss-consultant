import { ApiProperty } from '@nestjs/swagger';

export class CreateReportMediaDto {
  @ApiProperty()
  reportID: number;
  @ApiProperty()
  url?: string;
  @ApiProperty()
  type?: number;
}
