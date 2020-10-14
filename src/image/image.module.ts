import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterExtendedModule } from 'nestjs-multer-extended';
import { AuthModule } from 'src/auth/auth.module';
import { PostModule } from 'src/post/post.module';
import { PostRepository } from 'src/post/post.repository';
import { PostService } from 'src/post/post.service';
import { TagRepository } from 'src/tag/tag.repository';
import { TagService } from 'src/tag/tag.service';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { ImageController } from './image.controller';
import { ImageRepository } from './image.repository';
import { ImageService } from './image.service';

@Module({
  imports: [
    MulterExtendedModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        endpoint: config.get('AWS_ENDPOINT'),
        accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY_ID'),
        region: config.get('AWS_REGION'),
        bucket: config.get('AWS_BUCKET'),
        basePath: config.get('AWS_BASE_PATH'),
        fileSize: config.get<number>('AWS_FILE_SIZE_LIMIT_MB') * 1024 * 1024,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      ImageRepository,
      PostRepository,
      UserRepository,
      TagRepository,
    ]),
    AuthModule,
    UserModule,
    PostModule,
  ],
  providers: [ImageService, UserService, PostService, TagService],
  controllers: [ImageController],
  exports: [ImageService],
})
export class ImageModule {}
