import { ApiProperty } from '@nestjs/swagger';

export class UpdateHealthInfoDto {
  @ApiProperty()
  id?: number;
  @ApiProperty({
    description: 'Weight of customer',
    minimum: 1,
    type: Number,
  })
  weight: number;

  @ApiProperty({
    description: 'Height of customer',
    minimum: 1,
    type: Number,
  })
  height: number;

  @ApiProperty({
    description: 'Medical history of customer',
    type: String,
  })
  medicalHistory: string;

  @ApiProperty({
    description: 'Exercise habit of customer',
    type: String,
  })
  exerciseHabit: string;

  @ApiProperty({
    description: 'Diet info of customer',
    type: String,
  })
  diet: string;

  @ApiProperty({
    description: 'Customer email',
    type: String,
  })
  customerEmail: string;

  @ApiProperty({
    description: 'Create date of health info',
    type: String,
  })
  timestamp: number;
}
