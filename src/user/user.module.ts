import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserAuthController } from './user-auth.controller';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
  providers: [UserService],
  controllers: [UserController, UserAuthController],
  exports: [UserService],
})
export class UserModule {}
