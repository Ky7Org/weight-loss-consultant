import {IsEmail, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateTrainerDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email of trainer. cannot update',
    minimum: 1,
    type: String,
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Pasword of trainer',
    minimum: 1,
    type: String,
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'Full name of trainer',
    minimum: 1,
    type: String,
  })
  fullname: string;

  @IsString()
  @ApiProperty({
    description: 'Address of trainer',
    minimum: 1,
    default: 1,
    type: String,
  })
  address: string;

  @IsString()
  @ApiProperty({
    description: 'Phone of trainer',
    minimum: 1,
    type: String,
  })
  phone: string;

  @IsString()
  @ApiProperty({
    description: 'Gender of trainer',
    minimum: 1,
    type: String,
  })
  gender: string;

  @IsString()
  @ApiProperty({
    description: 'Profile image of trainer',
    minimum: 1,
    default: 1,
    type: String,
  })
  profileImage: string;

  @IsNumber()
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
  @IsNumber()
  dob: number;

  @ApiProperty({
    description: 'Experience years of trainer',
    type: Number,
  })
  @IsNumber()
  yearOfExp: number;

  @ApiProperty({
    description: 'Ratings of trainer',
    type: Number,
  })
  @IsNumber()
  rating: number;
}
