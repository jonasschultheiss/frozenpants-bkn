import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post as PostRoute,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';
import { IJwtPayload } from 'src/auth/interfaces/jwt.interface';
import { Post } from 'src/post/post.entity';
import { GetUser } from 'src/user/get-user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { UploadImageDto } from './dto/upload-image.dto';
import { Image } from './image.entity';
import { ImageService } from './image.service';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class ImageController {
  constructor(private imageService: ImageService) {}

  @PostRoute('/users/:id/avatar') // equal to @Post(), had to rename in import to prevent errors
  @UseInterceptors(
    AmazonS3FileInterceptor('file', {
      thumbnail: { suffix: 'thumb', width: 500, height: 500 },
      // randomFilename: true, <- buggy, created an issiue tho
      // https://github.com/jeffminsungkim/nestjs-multer-extended/issues/237
    }),
  )
  async setAvatar(
    @Param('id', ParseIntPipe) userId: number,
    @UploadedFile() uploadedImage: UploadImageDto,
  ): Promise<Image> {
    return this.imageService.setAvatar(userId, uploadedImage);
  }

  @PostRoute('/posts') // equal to @Post(), had to rename in import to prevent errors
  @UseInterceptors(
    AmazonS3FileInterceptor('file', {
      thumbnail: { suffix: 'thumb', width: 500, height: 500 },
      // randomFilename: true, <- buggy, created an issiue tho
      // https://github.com/jeffminsungkim/nestjs-multer-extended/issues/237
    }),
  )
  async createPost(
    @GetUser() user: IJwtPayload,
    @UploadedFile() uploadedImage: UploadImageDto,
    @Body(ValidationPipe) postDto: CreatePostDto,
  ): Promise<Post> {
    console.log('ImageController -> constructor -> user', user);
    return this.imageService.createPost(user.id, uploadedImage, postDto);
  }
}
