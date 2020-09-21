import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from 'src/auth/interfaces/jwt.interface';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { IAuthResponse } from './interfaces/auth-response.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    return await this.userRepository.signUp(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<IAuthResponse> {
    const { id, username } = await this.userRepository.signIn(signInDto);

    const payload: IJwtPayload = {
      id,
      username,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const response: IAuthResponse = { accessToken };
    return response;
  }

  async getUsers(filterDto: GetUserFilterDto): Promise<User[]> {
    return this.userRepository.getUsers(filterDto);
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['avatar'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
