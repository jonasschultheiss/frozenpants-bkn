import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from './image.entity';

@Entity()
export class ImageData extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ACL: string;

  @Column()
  Location: string;

  @Column()
  key: string;

  @Column()
  Key: string;

  @Column()
  Bucket: string;

  @Column()
  format: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  channels: number;

  @Column()
  premultiplied: false;

  @Column()
  size: number;

  @Column()
  ContentType: string;

  @Column()
  mimetype: string;

  @OneToOne(
    () => Image,
    image => image.thumb,
  )
  image: Image;
}
