import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsISBN,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  author: string;

  @IsISBN()
  isbn: string;

  @IsInt()
  @Min(1)
  totalCopies: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  genreId: number;
}