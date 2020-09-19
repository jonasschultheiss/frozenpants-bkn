import { Image } from 'src/image/image.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  uploadedAt: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToOne(() => Image, { onDelete: 'CASCADE' })
  @JoinColumn()
  image: Image;

  @ManyToOne(
    () => User,
    user => user.posts,
  )
  user: User;
}
