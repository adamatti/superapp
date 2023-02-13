import { ModuleMetadata } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, JwtGuard } from './auth0';
import { FirebaseAuthGuard, FirebaseAuthStrategy, FirebaseController, FirebaseService } from './firebase';

const auth0Config: ModuleMetadata = {
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, JwtGuard],
  exports: [PassportModule],
};

const firebaseConfig: ModuleMetadata = {
  imports: [],
  providers: [FirebaseAuthStrategy, FirebaseAuthGuard, FirebaseService],
  controllers: [FirebaseController],
};

// TODO evaluate if it should keep supporting both
@Module(firebaseConfig || auth0Config)
export class AuthModule {}
