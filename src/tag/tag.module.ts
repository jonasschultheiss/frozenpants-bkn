import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './tag.repository';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagRepository])],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
