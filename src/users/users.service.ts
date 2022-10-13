import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserDto } from './dto/userDto';
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

  async hashedPassword(user: UserDto): Promise<void> {
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }

  create = async (userData: UserDto): Promise<void> => {
    await this.hashedPassword(userData);
    console.log(userData);
    await this.userRepository.save(userData);
  };

  async validateUser(user: UserDto): Promise<{ accessToken: string } | undefined> {
    let userFind: User = await this.userRepository.findOneBy({ email: user.email });

    const validatePassword = await bcrypt.compare(user.password, userFind.password);
    if (!userFind || !validatePassword) {
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
}
