import { Controller, Get, Post, Headers, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, CreateCommentDto, CreateEmoticonDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entities/post.entity';
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
interface JwtPayload{
  id:number;
}
dotenv.config()

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/write')
  createPost(@Headers('token') token:string, @Body() createPostDto: CreatePostDto) {
    const key = process.env.JWT_SECRET_KEY
    const verified = jwt.verify(token, key) as JwtPayload
    createPostDto.user_id = verified.id;
    return this.postService.createPost(createPostDto);
  }

  @Post('/comment')
  createComment(@Headers('token') token:string, @Body() createCommentDto: CreateCommentDto) {
    const key = process.env.JWT_SECRET_KEY
    const verified = jwt.verify(token, key) as JwtPayload
    createCommentDto.user_id = verified.id;
    return this.postService.createComment(createCommentDto);
  }

  @Post('/emoticon')
  createEmoticon(@Headers('token') token:string, @Body() createEmoticonDto: CreateEmoticonDto){
    const key = process.env.JWT_SECRET_KEY
    const verified = jwt.verify(token, key) as JwtPayload
    createEmoticonDto.user_id = verified.id;
    return this.postService.createEmoticon(createEmoticonDto);
  }

  @Get()
  findAll():Promise<Posts[]> {
    return this.postService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    if (+id < 1) {
      throw new BadRequestException('id는 0보다 큰 값이어야 합니다.');
    }
    
    return this.postService.findOne(+id);
  }

  @Patch('/:id')
  update(@Headers('token') token:string, @Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    const key = process.env.JWT_SECRET_KEY
    const verified = jwt.verify(token, key) as JwtPayload
    const user_id = verified.id
    return this.postService.update(id, user_id, updatePostDto);
  }

  @Delete('/:id')
  remove(@Headers('token') token:string, @Param('id') id: number) {
    const key = process.env.JWT_SECRET_KEY
    const verified = jwt.verify(token, key) as JwtPayload
    const user_id = verified.id
    return this.postService.remove(id, user_id);
  }
}
