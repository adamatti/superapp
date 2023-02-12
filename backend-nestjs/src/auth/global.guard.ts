import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './is-public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class GlobalGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const canActivateResponse = super.canActivate(context);
    const result = await this.extractValueFromResponse(canActivateResponse);
    const user = context.switchToHttp().getRequest().user;
    console.log(user);
    return result;
  }

  private async extractValueFromResponse(response: boolean | Promise<boolean> | Observable<boolean>): Promise<boolean> {
    if (response instanceof Promise) {
      return await response;
    }
    if (response instanceof Observable) {
      return firstValueFrom(response);
    }
    return response;
  }
}
