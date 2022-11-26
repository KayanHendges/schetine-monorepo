import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Professional } from '../../entities/professional';
import { PaginationAndSortDTO } from '../../utils/dto/global.dto';

const usernameRegex = /^(?=[a-z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/g;

export class CreateProfessionalDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(usernameRegex)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class FindProfessionalDTO {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;
}

export class ListProfessionalDTO extends PaginationAndSortDTO<Professional> {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  created: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  modified: Date;
}

export class UpdateProfessionalParam {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class UpdateProfessionalDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Matches(usernameRegex)
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;
}

export class DeleteProfessionalParam {
  @IsString()
  @IsNotEmpty()
  id: string;
}
