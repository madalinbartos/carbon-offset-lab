import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignupRequest {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Transform(({ value }) => value.toLowerCase())
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
