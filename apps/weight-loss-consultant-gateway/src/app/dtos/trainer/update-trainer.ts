import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrainerDto {
  @ApiProperty({
    description: 'Email of trainer. cannot update',
    minimum: 1,
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Pasword of trainer',
    minimum: 1,
    type: String,
  })
  password: string;

  @ApiProperty({
    description: 'Full name of trainer',
    minimum: 1,
    type: String,
  })
  fullname: string;

  @ApiProperty({
    description: 'Address of trainer',
    minimum: 1,
    default: 1,
    type: String,
  })
  address: string;

  @ApiProperty({
    description: 'Phone of trainer',
    minimum: 1,
    type: String,
  })
  phone: string;

  @ApiProperty({
    description: 'Gender of trainer',
    minimum: 1,
    type: String,
  })
  gender: string;

  @ApiProperty({
    description: 'Profile image of trainer',
    minimum: 1,
    default: 1,
    type: String,
  })
  profileImage: string;

  @ApiProperty({
    description: 'Status of trainer',
    minimum: 1,
    default: 1,
    type: Number,
  })
  status: number;

  @ApiProperty({
    description: 'Date of birth of trainer',
    minimum: 1,
    default: 1,
    type: Number,
  })
  dob: number;

  @ApiProperty({
    description: 'Experience years of trainer',
    type: Number,
  })
  yearOfExp: number;

  @ApiProperty({
    description: 'Ratings of trainer',
    type: Number,
  })
  rating: number;
}
