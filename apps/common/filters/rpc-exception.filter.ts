import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { RpcExceptionModel } from './rpc-exception.model';

@Catch(RpcException)
export class ExceptionFilter extends BaseRpcExceptionFilter {
  catch(e: RpcException, host: ArgumentsHost): Observable<RpcExceptionModel> {
    return throwError(e);
  }
}
