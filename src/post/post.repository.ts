import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from 'src/image/dto/create-post.dto';
import { Image } from 'src/image/image.entity';
import { Tag } from 'src/tag/tag.entity';
import { User } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetPostFilter } from './dto/get-post-filter.dto';
import { PatchPostDto } from './dto/patch-post.dto';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(
    user: User,
    image: Image,
    postDto: CreatePostDto,
    tags: Tag[],
  ): Promise<Post> {
    const { title, description } = postDto;

    const post = new Post();
    post.title = title;
    post.description = description;
    post.image = image;
    post.user = user;
    post.tags = tags;

    try {
      return post.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getPosts(filterDto: GetPostFilter): Promise<Post[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('post');

    if (search) {
      query.andWhere(
        'post.title LIKE :search OR post.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    return query.getMany();
  }

  async patchPost(postId: number, patchDto: PatchPostDto): Promise<Post> {
    const { title, description } = patchDto;
    const post = await this.findOne(postId);

    if (!post) {
      throw new NotFoundException();
    }

    if (!post && !description) {
      throw new ConflictException('Title and description empty');
    }

    if (title) {
      post.title = title;
    }

    if (description) {
      post.description = description;
    }

    try {
      return post.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
