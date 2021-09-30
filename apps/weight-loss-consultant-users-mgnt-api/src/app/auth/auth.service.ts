import {Injectable} from '@nestjs/common';
import {AdminService} from "../services/impl/admin.service.impl";
import {CustomerService} from "../services/impl/customer.service.impl";
import {TrainerService} from "../services/impl/trainer.service.impl";
import {JwtService} from "@nestjs/jwt";

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
          role: 'ADMIN',
          ...admin
        };
      }
    } catch (e) {
      //move on
    }
    try {
      const customer = await this.customerService.findOneCustomer(username);
      if (customer && customer.password === password) {
        return {
          role: 'CUSTOMER',
          ...customer
        }
      }
    } catch (e) {
      //
    }
    try {
      const trainer = await this.trainerService.findOneTrainer(username);
      if (trainer && trainer.password === password) {
        return {
          role: 'TRAINER',
          ...trainer
        }
      }
    } catch (e) {
      //
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = {
      email: user.email,
      fullname: user.fullname,
      role: user.role,
      avartar: user.profileImage
    };
    const token = this.jwtService.sign(payload);
    const decodeInfo = this.jwtService.decode(token)

    return {
      accessToken : token,
      decodeInfo
    };
  }

}
