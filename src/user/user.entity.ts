import { Image } from 'src/image/image.entity';
import { Post } from 'src/post/post.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false, unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToOne(() => Image, { onDelete: 'CASCADE' })
  @JoinColumn()
  avatar: Image;

  @OneToMany(
    () => Post,
    posts => posts.user,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  posts: Post[];
}
