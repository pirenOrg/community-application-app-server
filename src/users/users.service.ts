import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  update(arg0: number, updateUserDto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  create(createUserDto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findUserIdByEmail(email: string): Promise<number> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('해당 이메일의 유저는 존재하지 않습니다.');
    }
    return user.id;
  }

}
