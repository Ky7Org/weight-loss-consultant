import {ApiProperty} from '@nestjs/swagger';

export class UpdateCustDto {
  @ApiProperty({
    description: 'Email of customer. cannot update',
    minimum: 1,
    type: String,

  })
  email?: string;

  @ApiProperty({
    description: 'Pasword of customer',
    minimum: 1,
    type: String,

  })
  password?: string;

  @ApiProperty({
    description: 'Full name of customer',
    minimum: 1,
    type: String,
  })
  fullname?: string;

  @ApiProperty({
    description: 'Address of customer',
    minimum: 1,
    default: 1,
    type: String,
  })
  address?: string;

  @ApiProperty({
    description: 'Phone of customer',
    minimum: 1,
    type: String,
  })
  phone?: string;

  @ApiProperty({
    description: 'Gender of customer',
    minimum: 1,
    type: String,
  })
  gender?: string;

  @ApiProperty({
    description: 'Profile image of customer',
    minimum: 1,
    default: 1,
    type: String,
  })
  profileImage?: string;

  @ApiProperty({
    description: 'Status of customer',
    minimum: 1,
    default: 1,
    type: Number,

  })
  status?: number;
  @ApiProperty({
    description: 'Date of birth of customer',
    minimum: 1,
    default: 1,
    type: Number,
  })
  dob?: number;
}
