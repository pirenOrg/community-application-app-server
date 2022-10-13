import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follows } from './entities/follow.entity';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/users/security/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follows, User]),
    JwtModule.register({ secret: process.env.JWT_SECRET_KEY, signOptions: { expiresIn: '5h' } }),
    PassportModule,
  ],
  exports: [TypeOrmModule],
  controllers: [FollowsController],
  providers: [FollowsService, UsersService, JwtStrategy],
})
export class FollowsModule {}
