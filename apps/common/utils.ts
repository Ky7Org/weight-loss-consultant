import {from, lastValueFrom, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {join} from "path";
import {RpcException} from "@nestjs/microservices";
import * as bcrypt from 'bcrypt';

type gRPCResponseType<T> = {
  data: T;
};
export const resolveGRPCProtosPath = (protoPath) => join(process.cwd(), protoPath);

export const constructGRPCResponse = (data: Promise<any> | Observable<any>): Observable<gRPCResponseType<any>> => {
  if (data instanceof Observable) {
    return data.pipe(map((resp) => {
      return {
        data: resp,
      }
    }));
  }
  return from(data)
    .pipe(map((resp) => {
      return {
        data: resp,
      }
    }));
};

export const unwrapGRPCResponse = (resp: Observable<gRPCResponseType<any>>): Promise<any> => {
  return lastValueFrom(resp).then((res) => res.data);
}

export const unwrapGRPCResponse$ = (resp: Observable<gRPCResponseType<any>>): Observable<any> => {
  return resp.pipe(map((res) => res.data));
}

export const constructGrpcException = (statusCode: number, message: string) => {
  throw new RpcException({
    message: JSON.stringify({
      statusCode: statusCode,
      message: message,
    })
  });
};

export const BCRYPT_CONFIG = async () => {
  salt: 10
};

