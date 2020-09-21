import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UploadImageDto } from './dto/upload-image.dto';
import { Image } from './image.entity';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: ImageRepository,
    private userService: UserService,
    private postService: PostService,
  ) {}

  async setAvatar(
    userId: number,
    uploadedImage: UploadImageDto,
  ): Promise<Image> {
    const user = await this.userService.getUser(userId);
    const image = await this.imageRepository.saveImage(uploadedImage);
    user.avatar = image;
    try {
      await user.save();
      return image;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createPost(
    userId: number,
    uploadedImage: UploadImageDto,
    postDto: CreatePostDto,
  ): Promise<Post> {
    const user = await this.userService.getUser(userId);
    console.log('ImageService -> user', user);
    const image = await this.imageRepository.saveImage(uploadedImage);
    console.log('ImageService -> image', image);
    const post = await this.postService.createPost(user, image, postDto);
    console.log('ImageService -> post', post);
    return post;
  }
}
