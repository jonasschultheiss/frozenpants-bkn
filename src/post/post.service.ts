import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/image/dto/create-post.dto';
import { Image } from 'src/image/image.entity';
import { User } from 'src/user/user.entity';
import { GetPostFilter } from './dto/get-post-filter.dto';
import { PatchPostDto } from './dto/patch-post.dto';
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

  async getPost(postId: number): Promise<Post> {
    const post = await this.postRepository.findOne(postId, {
      relations: ['user', 'image'],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async deletePost(postId: number): Promise<void> {
    const result = await this.postRepository.delete(postId);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async getPosts(filterDto: GetPostFilter): Promise<Post[]> {
    return this.postRepository.getPosts(filterDto);
  }

  async patchPost(postId: number, patchDto: PatchPostDto): Promise<Post> {
    return this.postRepository.patchPost(postId, patchDto);
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { user: { id: userId } },
    });
  }
}
