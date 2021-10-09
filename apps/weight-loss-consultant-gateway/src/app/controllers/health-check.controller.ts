import {Controller, Get, HttpStatus, Res} from '@nestjs/common';

@Controller(`/v1/health`)
export class HealthCheckController {

  @Get()
  public healthCheck(@Res() res) {
    res.status(HttpStatus.OK).send(`Pong!`);
  }
}
