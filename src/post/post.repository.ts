import { InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto } from 'src/image/dto/create-post.dto';
import { Image } from 'src/image/image.entity';
import { User } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(
    user: User,
    image: Image,
    postDto: CreatePostDto,
  ): Promise<Post> {
    const { title, description } = postDto;

    const post = new Post();
    post.title = title;
    post.description = description;
    post.image = image;
    post.user = user;

    try {
      return post.save();
    } catch (error) {
      console.log('PostRepository -> error', error);
      throw new InternalServerErrorException();
    }
  }
}
