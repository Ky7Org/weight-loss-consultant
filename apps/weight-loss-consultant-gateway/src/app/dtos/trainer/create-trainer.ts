import { ApiProperty } from '@nestjs/swagger';


export class CreateTrainerDto{

  @ApiProperty({
    description: 'Email of trainer, unique',
    minimum: 1,
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'Password of trainer',
    minimum: 1,
    type: String,

  })
  password: string;

  @ApiProperty({
    description: 'Retype password of trainer. must match with password',
    minimum: 1,
    type: String,
  })
  retypePassword: string;
}
