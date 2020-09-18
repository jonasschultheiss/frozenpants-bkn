import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';
import { UploadImageDto } from './dto/upload-image.dto';
import { Image } from './image.entity';
import { ImageService } from './image.service';

@Controller()
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('/users/:id/avatar')
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
    console.log(
      'ImageController -> constructor -> uploadedImage',
      uploadedImage,
    );
    return this.imageService.setAvatar(userId, uploadedImage);
  }
}
