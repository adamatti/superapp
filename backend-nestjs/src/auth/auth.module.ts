import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, JwtGuard } from './auth0';
import { FirebaseAuthGuard, FirebaseAuthStrategy } from './firebase';

const auth0Config = {
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, JwtGuard],
  exports: [PassportModule],
};

const firebaseConfig = {
  providers: [FirebaseAuthStrategy, FirebaseAuthGuard],
};

// TODO evaluate if it should keep supporting both
@Module(firebaseConfig || auth0Config)
export class AuthModule {}
