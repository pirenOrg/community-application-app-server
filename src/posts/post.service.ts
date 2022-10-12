import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private postRepository:Repository<Posts>,
  ){}
  
  create(user_id:number, createPostDto: CreatePostDto):Promise<CreatePostDto> {
    createPostDto.user_id = user_id
    return this.postRepository.save(createPostDto);
  }

  findAll():Promise<Posts[]> {
    return this.postRepository.find();
  }

  findOne(id: number):Promise<Posts> {
    return this.postRepository.findOne({where:{id}});
  }

  update(id: number, user_id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.update({id,user_id},updatePostDto);
  }

  remove(id: number, user_id:number){
    return this.postRepository.delete({id,user_id});
  }
}
