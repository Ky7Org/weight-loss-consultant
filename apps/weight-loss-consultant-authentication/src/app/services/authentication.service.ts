import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from './account.service';
import { Role } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/constants/enums';
import { USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../constant';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AdminEntity } from '../entities/admin.entity';
import { CustomerEntity } from '../entities/customer.entity';
import { TrainerEntity } from '../entities/trainer.entity';
import { combineLatest, Observable } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { LoginResponse } from '../../../../weight-loss-consultant-gateway/src/app/auth/login.res';
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

  private validateAccount(username: string, password: string): Observable<UserIdentity> {
    return combineLatest([this.validateAdmin(username).pipe(defaultIfEmpty(null)),
      this.validateCustomer(username).pipe(defaultIfEmpty(null)),
      this.validateTrainer(username).pipe(defaultIfEmpty(null))])
      .pipe(map(([admin, customer, trainer]) => {
        let user: AdminEntity | CustomerEntity | TrainerEntity;
        let userRole: Role;
        if (admin !== null) {
          user = admin as AdminEntity;
          userRole = Role.Admin;
        }
        if (customer !== null) {
          user = customer as CustomerEntity;
          userRole = Role.Customer;
        }
        if (trainer !== null) {
          user = trainer as TrainerEntity;
          userRole = Role.Trainer;
        }
        if (user.password === password) {
          return {
            ...user,
            role: userRole,
          } as UserIdentity;
        }
        throw new RpcException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid username or password.',
        } as RpcExceptionModel);
      }));
  }

  login(user: LoginRequest): Observable<LoginResponse> {
    return this.validateAccount(user.email, user.password)
      .pipe(map((user) => {
        return {
          accessToken: this.jwtService.sign(user),
          ...user
        };
      }));
  }
}
