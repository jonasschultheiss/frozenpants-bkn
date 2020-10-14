import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRepository: TagRepository) {}

  async getOrCreateTag(tagName: string): Promise<Tag> {
    let tag = await this.getTag(tagName);

    if (!tag) {
      tag = await this.createTag(tagName);
    }

    return tag;
  }

  private async getTag(tagName: string): Promise<Tag> {
    return this.tagRepository.findOne({ name: tagName });
  }

  private async createTag(tagName: string): Promise<Tag> {
    return this.tagRepository.createTag(tagName);
  }
}
