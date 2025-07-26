import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Idea must be at least 3 characters long' })
  @MaxLength(500, { message: 'Idea must not exceed 500 characters' })
  idea: string;
} 