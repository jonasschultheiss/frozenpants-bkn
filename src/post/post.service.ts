import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/image/dto/create-post.dto';
import { Image } from 'src/image/image.entity';
import { Tag } from 'src/tag/tag.entity';
import { TagService } from 'src/tag/tag.service';
import { User } from 'src/user/user.entity';
import { GetPostFilter } from './dto/get-post-filter.dto';
import { PatchPostDto } from './dto/patch-post.dto';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';
import { ISinglePost } from './single-post.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: PostRepository,
    private tagService: TagService,
  ) {}

  async createPost(
    user: User,
    image: Image,
    postDto: CreatePostDto,
  ): Promise<Post> {
    const { tagNames } = postDto;

    const converted = JSON.parse(tagNames);

    const tags: Tag[] = await Promise.all(
      converted.map(tagName => this.tagService.getOrCreateTag(tagName)),
    );

    console.log('tags', tags);

    return this.postRepository.createPost(user, image, postDto, tags);
  }

  async getPost(postId: number): Promise<ISinglePost> {
    const post = await this.postRepository.findOne(postId, {
      relations: ['user', 'image', 'tags'],
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const tags = post.tags;
    delete post.tags;

    const similar = [];

    for (const tag of tags) {
      const found = await this.getSimilarByTag(post.id, tag.id);

      similar.push({
        tagName: tag.name,
        posts: found,
      });
    }

    return { ...post, similar };
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

  private async getSimilarByTag(
    postId: number,
    tagId: number,
  ): Promise<Post[]> {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('post.image', 'image')
      .leftJoinAndSelect('image.thumb', 'thumb')
      .where('tags.id = :tagId', { tagId })
      .andWhere('post.id != :postId', { postId })
      .orderBy('post.uploadedAt')
      .limit(5)
      .getMany();
  }
}
