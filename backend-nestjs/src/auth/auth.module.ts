import { Module } from '@nestjs/common';
import { GlobalGuard } from './global.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, GlobalGuard],
  exports: [PassportModule],
})
export class AuthModule {}
