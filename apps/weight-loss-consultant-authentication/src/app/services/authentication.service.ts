import { HttpStatus, Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { AdminEntity } from '../entities/admin.entity';
import { CustomerEntity } from '../entities/customer.entity';
import { TrainerEntity } from '../entities/trainer.entity';
import { combineLatest, lastValueFrom, Observable } from 'rxjs';
import { catchError, defaultIfEmpty, map } from 'rxjs/operators';
import { RpcExceptionModel } from '../filters/rpc-exception.model';
import { LoginRequest } from '../models/login.req';
import { Role } from '../constants/enums';
import { FirebaseAuthService } from './firebase-auth.service';
import * as bcrypt from 'bcrypt';
import { KAFKA_USERS_MANAGEMENT_MESSAGE_PATTERN as MESSAGE_PATTERN } from '../../../../common/kafka-utils';

export interface UserIdentity {
  email: string;
  fullname: string;
  role: Role;
  profileImage: string;
}

@Injectable()
export class AuthenticationService implements OnModuleInit, OnModuleDestroy {

  private readonly logger = new Logger(AuthenticationService.name);

  @Inject('SERVER')
  private readonly client: ClientKafka;

  constructor(private readonly jwtService: JwtService,
              private readonly firebaseAuthService: FirebaseAuthService) {
  }

  async onModuleInit() {
    for (const [key, value] of Object.entries(MESSAGE_PATTERN.admins)) {
      this.client.subscribeToResponseOf(value);
    }
    for (const [key, value] of Object.entries(MESSAGE_PATTERN.trainers)) {
      this.client.subscribeToResponseOf(value);
    }
    for (const [key, value] of Object.entries(MESSAGE_PATTERN.customers)) {
      this.client.subscribeToResponseOf(value);
    }
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  private validateAdmin(username: string): Observable<AdminEntity> {
    return this.client
      .send<AdminEntity, string>(MESSAGE_PATTERN.admins.getByEmail, username);
  }

  private validateCustomer(username: string): Observable<CustomerEntity> {
    return this.client
      .send<CustomerEntity, string>(MESSAGE_PATTERN.customers.getByEmail, username);
  }

  private validateTrainer(username: string): Observable<TrainerEntity> {
    return this.client
      .send<TrainerEntity, string>(MESSAGE_PATTERN.trainers.getByEmail, username);
  }

  private async validateAccountWithoutPassword(username: string) {
    const users = await lastValueFrom(combineLatest([this.validateAdmin(username).pipe(defaultIfEmpty(null)),
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
      })));
    let user: AdminEntity | CustomerEntity | TrainerEntity;
    let userRole: Role;
    if (users[0] !== undefined && users[0] !== null) {
      user = users[0] as AdminEntity;
      userRole = Role.Admin;
    }
    if (users[1] !== undefined && users[1] !== null) {
      user = users[1] as CustomerEntity;
      userRole = Role.Customer;
    }
    if (users[2] !== undefined && users[2] !== null) {
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
    let admin : AdminEntity;
    let trainer : TrainerEntity;
    let customer : CustomerEntity;
    try {
      admin = await lastValueFrom<AdminEntity>(this.validateAdmin(username));
      if (admin && await bcrypt.compare(password, admin.password)) {
        return {
          ...admin,
          role: Role.Admin
        } as UserIdentity
      }
    } catch (err) {
      //
    }
    try {
      const trainer = await lastValueFrom<TrainerEntity>(this.validateTrainer(username));
      if (trainer && await bcrypt.compare(password, trainer.password)) {
        return {
          ...trainer,
          role: Role.Trainer
        } as UserIdentity
      }
    } catch (err) {
      //
    }
    try {
      const customer = await lastValueFrom<CustomerEntity>(this.validateCustomer(username));
      if (customer && await bcrypt.compare(password, customer.password)) {
        return {
          ...customer,
          role: Role.Customer
        } as UserIdentity
      }
    } catch (err) {
      //
    }
    if (!admin && !trainer && !customer) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid username or password.'
      } as RpcExceptionModel);
    }
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
    if (user === undefined) {
      throw new RpcException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid username or password.'
      } as RpcExceptionModel);
    }
    return {
      accessToken: this.jwtService.sign(user),
      ...user,
      password: undefined,
    };
  };


  async loginWithFirebase(firebaseUserToken: string) {
    const firebaseUser = await this.firebaseAuthService.authenticate(firebaseUserToken);
    const realUser = await this.validateAccountWithoutPassword(firebaseUser.email);
    return {
      accessToken: this.jwtService.sign(realUser),
      ...realUser
    };
  }
}
