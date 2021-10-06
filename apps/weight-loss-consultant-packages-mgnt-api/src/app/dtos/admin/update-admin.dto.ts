import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email of admin. cannot update',
    minimum: 1,
    type: String,

  })
  email?: string;

  @IsString()
  @ApiProperty({
    description: 'Pasword of admin',
    minimum: 1,
    type: String,

  })
  password?: string;

  @IsString()
  @ApiProperty({
    description: 'Full name of admin',
    minimum: 1,
    type: String,
  })
  fullname?: string;

  @IsString()
  @ApiProperty({
    description: 'Address of admin',
    minimum: 1,
    default: 1,
    type: String,
  })
  address?: string;

  @IsString()
  @ApiProperty({
    description: 'Phone of admin',
    minimum: 1,
    type: String,
  })
  phone?: string;
  @IsString()
  @ApiProperty({
    description: 'Gender of admin',
    minimum: 1,
    type: String,
  })
  gender?: string;


  @IsString()
  @ApiProperty({
    description: 'Profile image of admin',
    minimum: 1,
    default: 1,
    type: String,
  })
  profileImage?: string;

  @ApiProperty({
    description: 'Status of admin',
    minimum: 1,
    default: 1,
    type: Number,

  })
  status?: number;
  @ApiProperty({
    description: 'Date of birth of admin',
    minimum: 1,
    default: 1,
    type: Number,
  })
  dob?: number;
}
