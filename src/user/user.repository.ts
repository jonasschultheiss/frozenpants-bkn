import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { EntityRepository, Repository } from 'typeorm';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(private configService: ConfigService) {
    super();
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { username, email, password } = signUpDto;
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = await argon2.hash(password);

    try {
      await user.save();
    } catch (error) {
      console.log('UserRepository -> error', error);
      if (error.code == 23505) {
        throw new ConflictException('Username or Email already taken');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(signInDto: SignInDto): Promise<User> {
    const { username, password } = signInDto;
    const user = await this.findOne({ username });
    console.log('UserRepository -> user', user);

    if (!user) {
      throw new UnauthorizedException('Bad username or password');
    }

    const passwordHash = await this.getPasswordHash(username);

    const doPasswordsMatch = await argon2.verify(passwordHash, password);

    if (doPasswordsMatch) {
      return user;
    } else {
      throw new UnauthorizedException('Bad username or password');
    }
  }

  private async getPasswordHash(username: string): Promise<string> {
    const user = await this.findOne({ username }, { select: ['password'] });
    return user.password;
  }

  async getUsers(filterDto: GetUserFilterDto): Promise<User[]> {
    const { username } = filterDto;
    const query = this.createQueryBuilder('user');

    if (username) {
      query.andWhere('user.username LIKE :username', {
        username: `%${username}%`,
      });
    }

    return query.getMany();
  }
}
