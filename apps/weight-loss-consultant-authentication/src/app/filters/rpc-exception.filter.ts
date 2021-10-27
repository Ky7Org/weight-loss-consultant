import { ArgumentsHost, Catch } from '@nestjs/common';
import {BaseRpcExceptionFilter, Ctx, KafkaContext, RpcException} from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { RpcExceptionModel } from './rpc-exception.model';

@Catch(RpcException)
export class ExceptionFilter extends BaseRpcExceptionFilter {
  catch(e: RpcException, host: ArgumentsHost): Observable<RpcExceptionModel> {
    console.log("sdafasfasfasfasfsafs")
    const ctx = host.switchToRpc().getContext<KafkaContext>();
    console.log(ctx.getTopic())
    return throwError(e);
  }
}
