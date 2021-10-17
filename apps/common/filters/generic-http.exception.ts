import {HttpException, HttpStatus} from "@nestjs/common";

export class GenericHttpException extends HttpException {
  constructor(e) {
    super(e, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
