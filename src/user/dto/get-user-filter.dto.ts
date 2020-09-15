import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetUserFilterDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username: string;
}
