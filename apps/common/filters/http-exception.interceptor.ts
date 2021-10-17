import {CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor} from "@nestjs/common";
import {catchError} from "rxjs/operators";

@Injectable()
export class HttpExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(catchError((error) => {
      const httpError = JSON.parse(error.details);
      Logger.error(httpError);
      context.switchToHttp().getResponse().status(httpError.statusCode).send(httpError);
      throw error;
    }));
  }


}
