import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Tag } from './tag.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  async createTag(name: string): Promise<Tag> {
    const tag = new Tag();
    tag.name = name;

    try {
      await tag.save();
      return tag;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
