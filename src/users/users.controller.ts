import { Controller, Post, Body, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/userDto';
import { Response } from 'express';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: UserDto) {
    await this.usersService.findUser(createUserDto);

    this.usersService.create(createUserDto);
    return { message: 'user Created' };
  }

  @Post('/login')
  async login(@Body() userData: UserDto, @Res() res: Response): Promise<any> {
    const token = await this.usersService.validateUser(userData);
    res.setHeader('Authorization', token.accessToken);
    return res.json({ message: 'login success', token: token.accessToken });
  }
}
