import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserRequest {
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(40)
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  @MinLength(4)
  @MaxLength(20)
  username?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(170)
  bio?: string;
}
