import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { IAuthResponse } from './interfaces/auth-response.interface';
import { UserService } from './user.service';

@Controller('auth')
export class UserAuthController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<void> {
    return this.userService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<IAuthResponse> {
    return this.userService.signIn(signInDto);
  }
}
