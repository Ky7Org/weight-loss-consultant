import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller(`/v1/health`)
export class HealthCheckController {

  @Get()
  public healthCheck(@Res() res: Response) {
    res.status(HttpStatus.OK).send(`Pong!`);
  }
}
