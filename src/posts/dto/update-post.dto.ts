import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @MinLength(5, { message: 'Title is too short' })
  @MaxLength(100, { message: 'Title is too long' })
  title: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  @MinLength(10, { message: 'Content is too short' })
  @MaxLength(5000, { message: 'Content is too long' })
  content: string;
  @IsOptional()
  @IsNotEmpty({ message: 'Author name is required' })
  @IsString({ message: 'Author name must be a string' })
  @MinLength(3, { message: 'Author name is too short' })
  @MaxLength(25, { message: 'Author name is too long' })
  authorName: string;
}
