import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetPostFilter {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
