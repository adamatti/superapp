import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../is-public.decorator';
import { firstValueFrom, Observable } from 'rxjs';
import { UserService } from '../user.service';

interface FirebaseUser {
  name: string; // e.g. Marcelo Adamatti
  picture: string;
  aud: string; // e.g. adamatti
  user_id: string;
  email: string;
  email_verified: boolean;
  uid: string;
}

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase-auth') {
  constructor(private readonly reflector: Reflector, private readonly userService: UserService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canActivateResponse = await this.resolvePromise(super.canActivate(context));
    if (canActivateResponse) {
      const { firebaseUser } = await this.enrichRequest(context);
      return firebaseUser.email_verified;
    }
    return canActivateResponse;
  }

  private async enrichRequest(context: ExecutionContext): Promise<{ firebaseUser: FirebaseUser }> {
    const request = context.switchToHttp().getRequest();
    const firebaseUser = request.user as FirebaseUser;

    const user = await this.userService.findOrCreateUserByIdendity({ email: firebaseUser.email }, firebaseUser.uid);
    request.userId = user?.id;

    return {
      firebaseUser,
    };
  }

  private async resolvePromise<T>(value: T | Promise<T> | Observable<T>): Promise<T> {
    if (value instanceof Observable) {
      return await firstValueFrom(value);
    }
    return value;
  }
}
