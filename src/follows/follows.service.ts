import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Follows } from './entities/follow.entity';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follows) private followsRepository: Repository<Follows>,
    private usersService: UsersService
  ) {}

  async create(user_id: number, email: string): Promise<void> {
    const follow = new Follows();
    follow.follower_id = await this.usersService.findUserByID(user_id);
    follow.followee_id = await this.usersService.findUserIDByEmail(email);

    const existFollow = await this.followsRepository
      .createQueryBuilder()
      .where('follower_id = :follower_id AND followee_id = :followee_id', {
        follower_id: follow.follower_id,
        followee_id: follow.followee_id,
      })
      .getOne();

    if (existFollow) {
      throw new ConflictException('already followed.');
    }
    
    await this.followsRepository.save(follow);
  }

  async remove(user_id: number, target_id: number): Promise<void> {
    const followResult = await this.followsRepository
      .createQueryBuilder()
      .where('follower_id = :follower_id AND followee_id = :followee_id', {
        follower_id: user_id,
        followee_id: target_id,
      })
      .getOne();

    if (!followResult) {
      throw new NotFoundException('follow data does not exist');
    }

    await this.followsRepository.delete({ follower_id: user_id, followee_id: target_id });
  }
}
