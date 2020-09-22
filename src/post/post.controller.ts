import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetPostFilter } from './dto/get-post-filter.dto';
import { PatchPostDto } from './dto/patch-post.dto';
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

  @Delete('/:id')
  async deletePost(@Param('id', ParseIntPipe) postId: number): Promise<void> {
    return this.postService.deletePost(postId);
  }

  @Get('/')
  async getPosts(
    @Query(ValidationPipe) filterDto: GetPostFilter,
  ): Promise<Post[]> {
    return this.postService.getPosts(filterDto);
  }

  @Patch('/:id')
  async patchPost(
    @Param('id', ParseIntPipe) postId: number,
    @Body(ValidationPipe) patchDto: PatchPostDto,
  ): Promise<Post> {
    return this.postService.patchPost(postId, patchDto);
  }
}
