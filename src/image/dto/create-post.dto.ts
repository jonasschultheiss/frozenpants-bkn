import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @MaxLength(30)
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(2000)
  @MinLength(3)
  description: string;

  @IsOptional()
  tagNames: string;
}
