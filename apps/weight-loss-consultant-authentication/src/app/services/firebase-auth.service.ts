import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcExceptionModel } from '../../../../common/filters/rpc-exception.model';
import admin from '../../main';

@Injectable()
export class FirebaseAuthService {

  private getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentails!',
      } as RpcExceptionModel);
    }
    return match[1];
  }

  public async authenticate(authToken: string): Promise<any> {
    const tokenString = this.getToken(authToken);
    try {
      const decodedToken: admin.auth
        .DecodedIdToken = await admin.auth().verifyIdToken(tokenString);
      const {
        email,
        uid,
        role
      } = decodedToken;
      return {email, uid, role};
    } catch (e) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentails!',
      } as RpcExceptionModel);
    }
  }

}
