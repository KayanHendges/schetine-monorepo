import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '../../guards/global.jwt.guard';
import { JwtStrategy } from '../../providers/auth/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RepositoryModule } from '../../repositories/repository.module';

@Module({
  controllers: [AuthController],
  imports: [
    RepositoryModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
  exports: [AuthService],
})
export class AuthModule {}
