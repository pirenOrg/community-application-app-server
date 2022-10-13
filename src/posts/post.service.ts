import { Injectable } from '@nestjs/common';
import { CreateCommentDto, CreateEmoticonDto, CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts, Comments, Post_emoticons } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private postRepository:Repository<Posts>,
    @InjectRepository(Comments)
    private commentRepository:Repository<Comments>,
    @InjectRepository(Post_emoticons)
    private post_emoticonsRepository:Repository<Post_emoticons>,
  ){}

  createPost(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  createComment(createCommentDto: CreateCommentDto){
    return this.commentRepository.save(createCommentDto);
  }

  createEmoticon(createEmoticonDto: CreateEmoticonDto){
    return this.post_emoticonsRepository.save(createEmoticonDto)
  }

  findAll() {
    return this.postRepository.find({relations:['emoticons','comments']});
  }

  findOne(id: number):Promise<Posts> {
    return this.postRepository.findOne({where:{id}});
  }

  update(id: number, user_id:number, updatePostDto: UpdatePostDto) {
    return this.postRepository.update({id,user_id},updatePostDto);
  }

  remove(id: number, user_id:number){

    return this.postRepository.delete({id,user_id});
  }
}
