import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UploadImageDto } from './dto/upload-image.dto';
import { ImageData } from './image-data.entity';
import { Image } from './image.entity';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
  async saveImage(uploadedImage: UploadImageDto): Promise<Image> {
    const image = new Image();
    const { originalname, mimetype, original, thumb } = uploadedImage;

    image.originalname = originalname;
    image.mimetype = mimetype;

    const originalImageData = new ImageData();
    originalImageData.ACL = original.ACL;
    originalImageData.Location = original.Location;
    originalImageData.key = original.key;
    originalImageData.Key = original.Key;
    originalImageData.Bucket = original.Bucket;
    originalImageData.format = original.format;
    originalImageData.width = original.width;
    originalImageData.height = original.height;
    originalImageData.channels = original.channels;
    originalImageData.premultiplied = original.premultiplied;
    originalImageData.size = original.size;
    originalImageData.ContentType = original.ContentType;
    originalImageData.mimetype = original.mimetype;

    await originalImageData.save();

    const thumbImageData = new ImageData();
    thumbImageData.ACL = thumb.ACL;
    thumbImageData.Location = thumb.Location;
    thumbImageData.key = thumb.key;
    thumbImageData.Key = thumb.Key;
    thumbImageData.Bucket = thumb.Bucket;
    thumbImageData.format = thumb.format;
    thumbImageData.width = thumb.width;
    thumbImageData.height = thumb.height;
    thumbImageData.channels = thumb.channels;
    thumbImageData.premultiplied = thumb.premultiplied;
    thumbImageData.size = thumb.size;
    thumbImageData.ContentType = thumb.ContentType;
    thumbImageData.mimetype = thumb.mimetype;

    await thumbImageData.save();

    image.original = originalImageData;
    image.thumb = thumbImageData;
    console.log('image ->', image);

    try {
      return image.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
