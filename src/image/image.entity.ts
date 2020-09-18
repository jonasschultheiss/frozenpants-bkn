import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImageData } from './image-data.entity';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalname: string;

  @Column()
  mimetype: string;

  @OneToOne(() => ImageData, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  original: ImageData;

  @OneToOne(
    () => ImageData,
    thumb => thumb.image,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  thumb: ImageData;
}
