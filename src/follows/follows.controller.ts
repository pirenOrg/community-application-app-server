import { Controller, Post, Delete, Headers, Body } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken'
interface JwtPayload{
  id:number;
}

@Controller('follows')
export class FollowsController {
  constructor(
    private readonly followsService: FollowsService,
    private readonly usersService: UsersService
  ) { }
  
  @Post()
  async createFollow(@Headers('token') token: string, @Body('email') email: string) {
    const key = process.env.JWT_SECRET_KEY
    const verified = jwt.verify(token, key) as JwtPayload
    const user_id = verified.id;
    await this.followsService.create(user_id, email);
    return Object.assign({ message: 'follow success' });
  }

  @Delete()
  async remove(@Headers('token') token: string, @Body('target_id') target_id: number) {
    const key = process.env.JWT_SECRET_KEY
    const verified = jwt.verify(token, key) as JwtPayload
    const user_id = verified.id;
    await this.followsService.remove(user_id, target_id);
    return Object.assign({ message: 'unfollow success' });
  }
}
