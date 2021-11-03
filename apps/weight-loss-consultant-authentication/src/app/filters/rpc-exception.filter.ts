import {ArgumentsHost, Catch} from '@nestjs/common';
import {BaseRpcExceptionFilter, KafkaContext, RpcException} from '@nestjs/microservices';
import {Observable, throwError} from 'rxjs';

@Catch(RpcException)
export class ExceptionFilter extends BaseRpcExceptionFilter {
  catch(e: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToRpc().getContext<KafkaContext>();
    console.log("asssss");
   console.log(ctx.getTopic())
    console.log(JSON.stringify(e.getError()));
    return throwError(() => Buffer.from(JSON.stringify({
        error: {
          statusCode: e.getError()["statusCode"] || 500,
          message: e.getError()["message"] || "Internal Server Error",
          timestamp: new Date().toISOString(),
          trace: e.stack || "No stack trace available.",
          kafka: {
            topic: ctx.getTopic(),
            message: ctx.getMessage(),
            partition: ctx.getPartition(),
          }
        }
      }
    )));
  }
}
