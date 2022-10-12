import { Controller, Post, Headers, Body } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { UsersService } from 'src/users/users.service';

@Controller('follows')
export class FollowsController {
  constructor(
    private readonly followsService: FollowsService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  async createFollow(@Headers('user_id') user_id: number, @Body('email') email: string) {
    const target_id = await this.usersService.findUserIdByEmail(email);

    await this.followsService.findFollowDataByIds(user_id, target_id);
    await this.followsService.create(user_id, target_id);

    return Object.assign({ message: "팔로우 성공" });
  }
}
