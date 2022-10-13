import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  findUser = async (newUser: FindOptionsWhere<User>): Promise<void> => {
    let userData = await this.userRepository.findOneBy({ email: newUser.email });
    if (userData) {
      throw new BadRequestException('already exist email');
    }
  };

  async hashedPassword(user: CreateUserDto): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }

  create = async (userData: CreateUserDto): Promise<void> => {
    await this.hashedPassword(userData);
    await this.userRepository.save(userData);
  };

  async validateUser(user: CreateUserDto): Promise<{ accessToken: string } | undefined> {
    let userFind: User = await this.userRepository.findOneBy({ email: user.email });
    if (!userFind) {
      throw new BadRequestException({ message: 'user does not exist' });
    }
    const validatePassword = await bcrypt.compare(user.password, userFind.password);
    if (!validatePassword) {
      throw new UnauthorizedException();
    }

    const payload: Payload = { id: userFind.id, email: userFind.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async tokenValidateUser(payload: Payload): Promise<Payload | undefined> {
    const data = await this.userRepository.findOneBy({ id: payload.id });
    return { id: data.id, email: data.email };
  }

  async findUserIdByEmail(email: string): Promise<number> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('해당 이메일의 유저는 존재하지 않습니다.');
    }
    return user.id;
  }
}
