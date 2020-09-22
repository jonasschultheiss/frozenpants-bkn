import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class PatchPostDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  @MinLength(3)
  description: string;
}
