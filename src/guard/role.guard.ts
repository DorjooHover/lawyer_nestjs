import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserType } from '../utils/enum';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: UserType) {
    return roles.includes(userRole) || userRole == UserType.system
  }

   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<UserType[]>('roles', context.getHandler())
    if(!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user
    return this.matchRoles(roles, user.userType)
  }
}