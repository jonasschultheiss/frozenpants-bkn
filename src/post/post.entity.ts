import { Image } from 'src/image/image.entity';
import { Tag } from 'src/tag/tag.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => Tag, { onDelete: 'CASCADE' })
  @JoinTable()
  tags: Tag[];
}
