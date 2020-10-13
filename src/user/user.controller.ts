import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {}

  @Get('/')
  async getUsers(
    @Query(ValidationPipe) filterDto: GetUserFilterDto,
  ): Promise<User[]> {
    return this.userService.getUsers(filterDto);
  }

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @Get('/:id/posts')
  async getPostsByUser(@Param('id', ParseIntPipe) id: number): Promise<Post[]> {
    return this.postService.getPostsByUserId(id);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
