import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {ROLES_KEY} from '../decorators/roles.decorator';
import {Role} from "../../../../common/constants/enums";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    console.log("Role guard")
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('ji');
    if (!requiredRoles) {
      return true;
    }
    const {user} = context.switchToHttp().getRequest();
    console.log(requiredRoles);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
