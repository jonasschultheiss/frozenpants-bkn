import { Image } from 'src/image/image.entity';
import { Tag } from 'src/tag/tag.entity';
import { User } from 'src/user/user.entity';
import { Post } from './post.entity';

export interface ISinglePost {
  id: number;
  uploadedAt: string;
  title: string;
  description: string;
  image: Image;
  user: User;
  tags: Tag[];
  similar: {
    tagName: string;
    posts: Post[];
  }[];
}
