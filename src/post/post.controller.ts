import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetPostFilter } from './dto/get-post-filter.dto';
import { Post } from './post.entity';
import { PostService } from './post.service';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/:id')
  async getPost(@Param('id', ParseIntPipe) postId: number): Promise<Post> {
    return this.postService.getPost(postId);
  }

  @Get('/')
  async getPosts(
    @Query(ValidationPipe) filterDto: GetPostFilter,
  ): Promise<Post[]> {
    return this.postService.getPosts(filterDto);
  }
}
