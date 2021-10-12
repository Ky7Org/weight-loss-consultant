import {HttpStatus, Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Client, ClientGrpc, RpcException} from '@nestjs/microservices';
import {combineLatest, from, Observable} from 'rxjs';
import {catchError, defaultIfEmpty, map} from 'rxjs/operators';
import {LoginRequest} from '../models/login.req';
import {Role} from '../constants/enums';
import {USERS_MANAGEMENT_GRPC_SERVICE} from "../../../../common/grpc-services.route";
import {AdminService, CustomerService, TrainerService} from "../../../../common/proto-models/users-mgnt.proto";
import {unwrapGRPCResponse$} from "../../../../common/utils";
import {RpcExceptionModel} from "../../../../common/filters/rpc-exception.model";
import {AdminEntity} from "../../../../common/entities/admin.entity";
import {CustomerEntity} from "../../../../common/entities/customer.entity";
import {TrainerEntity} from "../../../../common/entities/trainer.entity";

export interface UserIdentity {
  email: string;
  fullname: string;
  role: Role;
  profileImage: string;
}

@Injectable()
export class AuthenticationService implements OnModuleInit {

  private readonly logger = new Logger(AuthenticationService.name);

  @Client(USERS_MANAGEMENT_GRPC_SERVICE)
  private readonly usersManagementClient: ClientGrpc;

  private adminService: AdminService;
  private customerService: CustomerService;
  private trainerService: TrainerService;

  constructor(private readonly jwtService: JwtService) {
  }

  onModuleInit() {
    this.adminService = this.usersManagementClient.getService<AdminService>('AdminService');
    this.customerService = this.usersManagementClient.getService<CustomerService>('CustomerService');
    this.trainerService = this.usersManagementClient.getService<TrainerService>('TrainerService');
  }

  private validateAdmin(email: string): Observable<AdminEntity> {
    return unwrapGRPCResponse$(this.adminService.viewDetail({email}));
  }

  private validateCustomer(email: string): Observable<CustomerEntity> {
    return unwrapGRPCResponse$(this.customerService.viewDetail({email}));
  }

  private validateTrainer(email: string): Observable<TrainerEntity> {
    return unwrapGRPCResponse$(this.trainerService.viewDetail({email}));
  }

  private async validateAccountWithoutPassword(username: string) {
    const users = await combineLatest([this.validateAdmin(username).pipe(defaultIfEmpty(null)),
      this.validateCustomer(username).pipe(defaultIfEmpty(null)),
      this.validateTrainer(username).pipe(defaultIfEmpty(null))])
      .pipe(map(([admin, customer, trainer]) => {
        return [admin, customer, trainer];
      }), catchError((e, u) => {
        console.log(e);
        throw new RpcException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid username or password.'
        } as RpcExceptionModel);
        return u;
      })).toPromise();
    let user: AdminEntity | CustomerEntity | TrainerEntity;
    let userRole: Role;
    console.log(users);
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
    console.log(user);
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
      admin  = await this.validateAdmin(username).toPromise();
      if (admin && admin.password === password) {
        console.log("admin")
        return {
          ...admin,
          role: Role.Admin
        } as UserIdentity
      }
    } catch (err) {
      //
    }
    try {
      const trainer = await this.validateTrainer(username).toPromise();
      if (trainer && trainer.password === password) {
        console.log("trainer")
        return {
          ...trainer,
          role: Role.Trainer
        } as UserIdentity
      }
    } catch (err) {
      //
    }
    try {
      const customer = await this.validateCustomer(username).toPromise();
      if (customer && customer.password === password) {
        console.log("customer")
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
