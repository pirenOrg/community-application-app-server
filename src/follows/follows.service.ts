import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Follows } from './entities/follow.entity';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follows) private followsRepository: Repository<Follows>, private usersService: UsersService) { }
  
  async create(user_id: number, email: string): Promise<void> {
    const follow = new Follows()
    follow.follower_id = await this.usersService.findUserByID(user_id);
    follow.followee_id = await this.usersService.findUserIDByEmail(email)

    // 이미 팔로우한 유저 막는 부분 현재 안되고 있음..
    // const existFollow = await this.followsRepository.find({
    //   where: {
    //     follower_id: follow.follower_id,
    //     followee_id: follow.followee_id
    //   },
    // });

    // if (existFollow) {
    //   throw new ConflictException('이미 팔로우한 유저입니다.');
    // }
  
    await this.followsRepository.save(follow)
  }
}
