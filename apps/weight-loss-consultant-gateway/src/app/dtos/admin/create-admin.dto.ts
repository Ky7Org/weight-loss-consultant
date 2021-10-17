import {ApiProperty} from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Email of admin, unique',
    minimum: 1,
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Password of admin',
    minimum: 1,
    type: String,

  })
  password: string;

  @ApiProperty({
    description: 'Retype password of admin. must match with password',
    minimum: 1,
    type: String,
  })
  retypePassword: string;

}
