import {
  Controller,
  Get,
  HttpStatus,
  Res,
} from "@nestjs/common";
import { Response } from 'express';

@Controller(`/health`)
export class HealthCheckController {

  @Get()
  public healthCheck(@Res() res: Response) {
    res.status(HttpStatus.OK).send(`Pong!`);
  }
}
