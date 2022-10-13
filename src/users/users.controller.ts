import { Controller, Post, Body, Res, Req, Get, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/userDto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './security/jwt.guard';
import { User } from './entities/user.entity';
import { Payload } from './security/payload.interface';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body(ValidationPipe) createUserDto: UserDto) {
    await this.usersService.findUser(createUserDto);

    this.usersService.create(createUserDto);
    return { message: 'user Created' };
  }

  @Post('/login')
  async login(@Body(ValidationPipe) userData: UserDto, @Res() res: Response): Promise<any> {
    console.log(userData);
    const token = await this.usersService.validateUser(userData);
    res.setHeader('Authorization', 'Bearer ' + token.accessToken);
    return res.json({ message: 'login success', token: token.accessToken });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/token-test')
  getUser(@Req() req: Request): Payload {
    const user: any = req.user;
    console.log(req.user);
    return user;
  }
}
