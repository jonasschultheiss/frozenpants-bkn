import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false, unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  avatarPath: string;
}
