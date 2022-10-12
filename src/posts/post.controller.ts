import { Controller, Get, Post, Headers, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/input')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll():Promise<Posts[]> {
    return this.postService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    if (+id < 1) {
      throw new BadRequestException('id는 0보다 큰 값이어야 합니다.');
    }
    
    return this.postService.findOne(+id);
  }

  @Patch('/:id')
  update(@Headers('user_id') user_id:number, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, user_id, updatePostDto);
  }

  @Delete('/:id')
  remove(@Headers('user_id') user_id:number, @Param('id') id: string) {
    return this.postService.remove(+id, user_id);
  }
}
