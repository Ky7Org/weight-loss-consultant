import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from "@nestjs/common";
import {GenericHttpException} from "./generic-http.exception";

@Catch(GenericHttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: GenericHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let error;
    const errorMsg = exception.message.substring(exception.message.indexOf(':')+1);
    if (!errorMsg.trim().startsWith('{')) {
      error = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: errorMsg,
        timestamp: new Date().toISOString(),
      };
    } else {
      error = JSON.parse(errorMsg);
    }
    response
      .status(error.statusCode)
      .send({
        ...error,
        path: request.url,
      });
  }
}
