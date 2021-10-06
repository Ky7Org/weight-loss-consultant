import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from './account.service';
import { Role } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/constants/enums';
import { USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../constant';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AdminEntity } from '../entities/admin.entity';
import { CustomerEntity } from '../entities/customer.entity';
import { TrainerEntity } from '../entities/trainer.entity';
import { combineLatest, from, Observable } from 'rxjs';
import { catchError, defaultIfEmpty, map, tap } from 'rxjs/operators';
import { LoginRequest } from 'apps/weight-loss-consultant-gateway/src/app/auth/login.req';
import { RpcExceptionModel } from '../filters/rpc-exception.model';


export const ADMIN_VIEW_DETAIL = 'admin-view-detail';
export const CUSTOMER_VIEW_DETAIL = 'customer-view-detail';
export const TRAINER_VIEW_DETAIL = 'trainer-view-detail';

export interface UserIdentity {
  email: string;
  fullname: string;
  role: Role;
  profileImage: string;
}

@Injectable()
export class AuthenticationService {

  private readonly logger = new Logger(AuthenticationService.name);

  constructor(private readonly accountService: AccountService,
              @Inject(USERS_MANAGEMENT_SERVICE_NAME)
              private readonly usersManagementServiceProxy: ClientProxy,
              private readonly jwtService: JwtService) {
  }

  private validateAdmin(username: string): Observable<AdminEntity> {
    return this.usersManagementServiceProxy
      .send<AdminEntity, string>({ cmd: ADMIN_VIEW_DETAIL }, username);
  }

  private validateCustomer(username: string): Observable<CustomerEntity> {
    return this.usersManagementServiceProxy
      .send<CustomerEntity, string>({ cmd: CUSTOMER_VIEW_DETAIL }, username);
  }

  private validateTrainer(username: string): Observable<TrainerEntity> {
    return this.usersManagementServiceProxy
      .send<TrainerEntity, string>({ cmd: TRAINER_VIEW_DETAIL }, username);
  }

  private async validateAccountWithoutPassword(username: string) {
    const users = await combineLatest([this.validateAdmin(username).pipe(defaultIfEmpty(null)),
      this.validateCustomer(username).pipe(defaultIfEmpty(null)),
      this.validateTrainer(username).pipe(defaultIfEmpty(null))])
      .pipe(map(([admin, customer, trainer]) => {
        return [admin, customer, trainer];
      }), catchError((e, u) => {
        throw new RpcException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid username or password.'
        } as RpcExceptionModel);
        return u;
    })).toPromise();
    let user: AdminEntity | CustomerEntity | TrainerEntity;
    let userRole: Role;
    if (users[0] !== undefined) {
      user = users[0] as AdminEntity;
      userRole = Role.Admin;
    }
    if (users[1] !== undefined) {
      user = users[1] as CustomerEntity;
      userRole = Role.Customer;
    }
    if (users[2] !== undefined) {
      user = users[2] as TrainerEntity;
      userRole = Role.Trainer;
    }
    if (!user) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid username or password.'
      } as RpcExceptionModel);
    }
    return {
      ...user,
      role: userRole
    } as UserIdentity;
  }


  async validateAccount(username: string, password: string): Promise<UserIdentity> {
    const users = await combineLatest([this.validateAdmin(username).pipe(defaultIfEmpty(null)),
      this.validateCustomer(username).pipe(defaultIfEmpty(null)),
      this.validateTrainer(username).pipe(defaultIfEmpty(null))])
      .pipe(map(([admin, customer, trainer]) => {
        return [admin, customer, trainer];
      })).toPromise();
    let user: AdminEntity | CustomerEntity | TrainerEntity;
    let userRole: Role;
    if (users[0] !== undefined) {
      user = users[0] as AdminEntity;
      userRole = Role.Admin;
    }
    if (users[1] !== undefined) {
      user = users[1] as CustomerEntity;
      userRole = Role.Customer;
    }
    if (users[2] !== undefined) {
      user = users[2] as TrainerEntity;
      userRole = Role.Trainer;
    }
    if (user.password === password) {
      return {
        ...user,
        role: userRole
      } as UserIdentity;
    }
    throw new RpcException({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Invalid username or password.'
    } as RpcExceptionModel);
  };

  async login(user: LoginRequest): Promise<any> {
    if (user === undefined || user.email === undefined || user.email.length < 1 ||
      user.password === undefined || user.password.length < 1) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid username or password.'
      } as RpcExceptionModel);
    }

    user = await this.validateAccount(user.email, user.password);
    return {
      accessToken: this.jwtService.sign(user),
      ...user
    };
  };


  async loginWithFirebase(firebaseUser: any) {
    const realUser = await this.validateAccountWithoutPassword(firebaseUser.email);
    return {
      accessToken: this.jwtService.sign(realUser),
      ...realUser
    };
  }
}
