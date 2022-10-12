import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './entities/post.entity';
import { getConnection } from "typeorm";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private postRepository:Repository<Posts>,
  ){}
  
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll():Promise<Posts[]> {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
