import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/image/dto/create-post.dto';
import { Image } from 'src/image/image.entity';
import { User } from 'src/user/user.entity';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: PostRepository,
  ) {}

  async createPost(
    user: User,
    image: Image,
    postDto: CreatePostDto,
  ): Promise<Post> {
    return this.postRepository.createPost(user, image, postDto);
  }
}
