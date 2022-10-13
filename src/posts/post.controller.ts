import { Controller, Get, Post, Headers, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, CreateCommentDto, CreateEmoticonDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/write')
  createPost(@Headers('token') token:string, @Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(token, createPostDto);
  }

  @Post('/comment')
  createComment(@Headers('token') token:string, @Body() createCommentDto: CreateCommentDto) {
    return this.postService.createComment(token,createCommentDto);
  }

  @Post('/emoticon')
  createEmoticon(@Headers('token') token:string, @Body() createEmoticonDto: CreateEmoticonDto){
    return this.postService.createEmoticon(token,createEmoticonDto);
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
    return this.postService.update(id, token, updatePostDto);
  }

  @Delete('/:id')
  remove(@Headers('token') token:string, @Param('id') id: number) {
    return this.postService.remove(id, token);
  }
}
