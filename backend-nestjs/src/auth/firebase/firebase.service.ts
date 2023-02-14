import { Injectable } from '@nestjs/common';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from './firebase.config';
import { UserImpl } from '@firebase/auth/internal';
import { TokenResponse } from './dto';

@Injectable()
export class FirebaseService {
  private readonly app: FirebaseApp;

  constructor() {
    // FIXME review if this is stateless and can be used by multiple users
    this.app = initializeApp(firebaseConfig);
  }

  async createUser(email: string, password: string): Promise<TokenResponse> {
    const auth = getAuth(this.app);
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    return this.returnTokens(userCredential);
  }

  async login(email: string, password: string) {
    const auth = getAuth(this.app);
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return this.returnTokens(userCredential);
  }

  private returnTokens(userCredential: UserCredential): TokenResponse {
    const user = userCredential.user as UserImpl;

    return new TokenResponse({
      accessToken: user.stsTokenManager.accessToken,
      refreshToken: user.stsTokenManager.refreshToken,
    });
  }
}
