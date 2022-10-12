import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Posts])],
  exports:[TypeOrmModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
