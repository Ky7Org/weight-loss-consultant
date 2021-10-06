import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Email of admin, unique',
    minimum: 1,
    type: String,
  })
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Password of admin',
    minimum: 1,
    type: String,

  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'Retype password of admin. must match with password',
    minimum: 1,
    type: String,
  })
  retypePassword: string;

}
