import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments, Posts, Post_emoticons } from './entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Posts,Post_emoticons,Comments])],
  exports:[TypeOrmModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
