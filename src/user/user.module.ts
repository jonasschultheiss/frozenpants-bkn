import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PostModule } from 'src/post/post.module';
import { PostRepository } from 'src/post/post.repository';
import { PostService } from 'src/post/post.service';
import { TagRepository } from 'src/tag/tag.repository';
import { TagService } from 'src/tag/tag.service';
import { UserAuthController } from './user-auth.controller';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, PostRepository, TagRepository]),
    AuthModule,
    PostModule,
  ],
  providers: [UserService, PostService, TagService],
  controllers: [UserController, UserAuthController],
  exports: [UserService],
})
export class UserModule {}
