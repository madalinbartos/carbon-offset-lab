import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ProjectRequest {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(999999999)
  fundingGoal?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  location?: string;
}
