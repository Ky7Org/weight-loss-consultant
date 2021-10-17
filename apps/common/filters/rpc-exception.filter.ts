import {ArgumentsHost, Catch} from '@nestjs/common';
import {BaseRpcExceptionFilter, RpcException} from '@nestjs/microservices';
import {Observable, throwError} from 'rxjs';
import {RpcExceptionModel} from './rpc-exception.model';

@Catch(RpcException)
export class ExceptionFilter extends BaseRpcExceptionFilter<RpcException> {
  catch(e: RpcException, host: ArgumentsHost): Observable<RpcExceptionModel> {
    const httpError = JSON.parse(e.message);
    return throwError(() => new RpcException({
      message: JSON.stringify({
        statusCode: httpError.statusCode,
        message: httpError.message,
        timestamp: new Date().toISOString(),
      })
    }));
  }
}
