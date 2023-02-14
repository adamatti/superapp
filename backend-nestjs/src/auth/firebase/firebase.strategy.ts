import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';

import * as firebase from 'firebase-admin';
import { PassportStrategy } from '@nestjs/passport';
import firebase_params from './firebase.config';
import { ACCESS_TOKEN } from './constants';
import { Request } from 'express';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, 'firebase-auth') {
  private defaultApp: any;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        FirebaseAuthStrategy.extractJWTFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: 'batata',
    });

    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
    });
  }

  async validate(token: string) {
    const firebaseUser: any = await this.defaultApp
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException(err.message);
      });
    if (!firebaseUser) {
      throw new UnauthorizedException();
    }
    return firebaseUser;
  }

  private static extractJWTFromCookie(req: Request): string | null {
    return (req.cookies && req.cookies[ACCESS_TOKEN]) || null;
  }
}
