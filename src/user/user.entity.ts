import { Image } from 'src/image/image.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
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
}
