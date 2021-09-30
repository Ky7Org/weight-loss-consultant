import {Injectable} from '@nestjs/common';
import {AdminService} from "../services/impl/admin.service.impl";
import {CustomerService} from "../services/impl/customer.service.impl";
import {TrainerService} from "../services/impl/trainer.service.impl";
import {JwtService} from "@nestjs/jwt";
import {LoginResponse} from "./login.res";

@Injectable()
export class AuthService {

  constructor(
    private adminService: AdminService,
    private customerService: CustomerService,
    private trainerService: TrainerService,
    private jwtService: JwtService) {
  }

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const admin = await this.adminService.viewDetail(username); //or email is fine
      if (admin && admin.password === password) {
        return {
          ...admin,
          role: "ADMIN"
        };
      }
    } catch (e) {
      //
    }
    try {
      const customer = await this.customerService.findOneCustomer(username);
      if (customer && customer.password === password) {
        return {
          ...customer,
          role: "CUSTOMER"
        };
      }
    } catch (e) {
      //
    }
    try {
      const trainer = await this.trainerService.findOneTrainer(username);
      if (trainer && trainer.password === password) {
        return {
          ...trainer,
          role: "TRAINER"
        };
      }
    } catch (e) {
      //
    }
    return null;
  }

  async login(user: any): Promise<LoginResponse> {
    const payload = {
      email: user.email,
      fullname: user.fullname,
      role: user.role
    };
    const res = new LoginResponse();
    res.accessToken = this.jwtService.sign(payload);
    res.email = user.email;
    res.fullname = user.fullname;
    res.avartar = user.profileImage;
    res.role = user.role;
    return res;
  }

}
