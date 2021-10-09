import {HttpException, HttpStatus} from '@nestjs/common';

export class MissingParamsException extends HttpException {
  constructor() {
    super('Unable to process the contained instructions. Maybe you are missing some parameters in the URL !', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
