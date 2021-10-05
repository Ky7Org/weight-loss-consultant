import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from './account.service';
import { Role } from '../../../../weight-loss-consultant-users-mgnt-api/src/app/constants/enums';
import { USERS_MANAGEMENT_SERVICE_NAME } from '../../../../../constant';
import { ClientProxy } from '@nestjs/microservices';
import { AdminEntity } from '../entities/admin.entity';
import { CustomerEntity } from '../entities/customer.entity';
import { TrainerEntity } from '../entities/trainer.entity';
import { LoginResponse } from '../../../../weight-loss-consultant-gateway/src/app/auth/login.res';


export const ADMIN_VIEW_DETAIL = 'admin-view-detail';
export const CUSTOMER_VIEW_DETAIL = 'customer-view-detail';
export const TRAINER_VIEW_DETAIL = 'trainer-view-detail';

@Injectable()
export class AuthenticationService {

  private readonly logger = new Logger(AuthenticationService.name);

  constructor(private readonly accountService: AccountService,
              @Inject(USERS_MANAGEMENT_SERVICE_NAME)
              private readonly usersManagementServiceProxy: ClientProxy,
              private readonly jwtService: JwtService) {
  }

  private async validateAdmin(username: string, password: string): Promise<any> {
    return await this.usersManagementServiceProxy
      .send<AdminEntity, string>({ cmd: ADMIN_VIEW_DETAIL }, username)
      .toPromise(); //or email is fine
  }

  private async validateCustomer() {
    const customer = await this.usersManagementServiceProxy
      .send<CustomerEntity, string>({ cmd: CUSTOMER_VIEW_DETAIL }, username)
      .toPromise();
  }


  async validateAccount(username: string, password: string): Promise<any> {
    try {
      const admin = await this.usersManagementServiceProxy
        .send<AdminEntity, string>({ cmd: ADMIN_VIEW_DETAIL }, username)
        .toPromise(); //or email is fine
      if (admin && admin.password === password) {
        return {
          ...admin,
          roles: [Role.Admin]
        };
      }
    } catch (e) {
      this.logger.error(e);
    }
    try {
      //const customer = await this.customerService.findOneCustomer(username);
      const customer = await this.usersManagementServiceProxy
        .send<CustomerEntity, string>({ cmd: CUSTOMER_VIEW_DETAIL }, username)
        .toPromise();
      if (customer && customer.password === password) {
        return {
          ...customer,
          roles: [Role.Customer]
        };
      }
    } catch (e) {
      this.logger.error(e);
    }
    try {
      const trainer = await this.usersManagementServiceProxy
        .send<TrainerEntity, string>({ cmd: TRAINER_VIEW_DETAIL }, username)
        .toPromise();
      if (trainer && trainer.password === password) {
        return {
          ...trainer,
          roles: [Role.Trainer]
        };
      }
    } catch (e) {
      //
    }
    return null;
  }

  async login(user: any): Promise<LoginResponse> {
    console.log(user);
    const payload = {
      email: user.email,
      fullname: user.fullname,
      roles: user.roles
    };
    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
      email: user.email,
      fullname: user.fullname,
      avatar: user.avatar,
      role: user.role
    };
  }
}
