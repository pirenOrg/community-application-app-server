import { Injectable } from '@nestjs/common';
import { CreateCommentDto, CreateEmoticonDto, CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts, Comments, Post_emoticons } from './entities/post.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
interface JwtPayload{
  userId:number;
}
dotenv.config()

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private postRepository:Repository<Posts>,
    @InjectRepository(Comments)
    private commentRepository:Repository<Comments>,
    @InjectRepository(Post_emoticons)
    private emoticonRepository:Repository<Post_emoticons>
  ){}

  createPost(token:string, createPostDto: CreatePostDto) {
    const key = process.env.JWT_SECRET_KEY
    const {userId} = jwt.verify(token, key) as JwtPayload
    createPostDto.user_id = userId;
    return this.postRepository.save(createPostDto);
  }

  createComment(token:string, createCommentDto: CreateCommentDto){
    const key = process.env.JWT_SECRET_KEY
    const { userId } = jwt.verify(token, key) as JwtPayload
    createCommentDto.user_id = userId;
    return this.commentRepository.save(createCommentDto);
  }

  createEmoticon(token:string, createEmoticonDto: CreateEmoticonDto){
    const key = process.env.JWT_SECRET_KEY
    const { userId } = jwt.verify(token, key) as JwtPayload
    createEmoticonDto.user_id = userId;
    return this.emoticonRepository.save(createEmoticonDto)
  }

  findAll() {
    return this.postRepository.find({relations:['emoticons','comments']});
  }

  findOne(id: number):Promise<Posts> {
    return this.postRepository.findOne({where:{id}});
  }

  update(id: number, token:string, updatePostDto: UpdatePostDto) {
    const key = process.env.JWT_SECRET_KEY
    const { userId } = jwt.verify(token, key) as JwtPayload
    const user_id = userId
    return this.postRepository.update({id,user_id},updatePostDto);
  }

  remove(id: number, token:string){
    const key = process.env.JWT_SECRET_KEY
    const { userId } = jwt.verify(token, key) as JwtPayload
    const user_id = userId
    return this.postRepository.delete({id,user_id});
  }
}
