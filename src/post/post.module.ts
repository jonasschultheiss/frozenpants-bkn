import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from 'src/tag/tag.repository';
import { TagService } from 'src/tag/tag.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository, TagRepository])],
  providers: [PostService, TagService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
