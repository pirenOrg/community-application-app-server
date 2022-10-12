import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow as Follows } from './entities/follow.entity';

@Injectable()
export class FollowsService {
  constructor(@InjectRepository(Follows) private followsRepository: Repository<Follows>) {}

  async create(follower_id: number, followee_id: number): Promise<void> {
    const followUser = new Follows();
    followUser.follower_id = follower_id;
    followUser.followee_id = followee_id;

    await this.followsRepository.save(followUser);
    
  }

  async findFollowDataByIds(from_user_id: number, target_id: number) {
    const result = await this.followsRepository.findAndCount({
      where: [
        {
          follower_id: from_user_id,
          followee_id: target_id,
        },
      ],
    });

    if (result[1] !== 0) {
      throw new ConflictException('이미 팔로우한 유저입니다.');
    }
  }
}
