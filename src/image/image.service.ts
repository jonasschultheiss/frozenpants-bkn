import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { Image } from './image.entity';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
    private userService: UserService,
  ) {}

  async setAvatar(
    userId: number,
    uploadedImage: UploadImageDto,
  ): Promise<Image> {
    const user = await this.userService.getUser(userId);
    const image = await this.imageRepository.setAvatar(uploadedImage);
    user.avatar = image;
    try {
      await user.save();
      return image;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
