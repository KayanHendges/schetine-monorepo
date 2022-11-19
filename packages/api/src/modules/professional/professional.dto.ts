import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { QueryFilterToObject } from '../../utils/dto/QueryFilterToObject';
import { Transform } from 'class-transformer';

export class CreateProfessionalDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
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

export class ListProfessionalDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Transform((opa) => QueryFilterToObject(opa.value, 'string'))
  id: string;

  @IsNotEmpty()
  @IsOptional()
  @Transform((opa) => QueryFilterToObject(opa.value, 'string'))
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Transform((opa) => QueryFilterToObject(opa.value, 'string'))
  username: string;

  @IsOptional()
  @Transform((opa) => QueryFilterToObject(opa.value, 'string'))
  email: string;

  @IsDate()
  @IsOptional()
  @Transform((opa) => QueryFilterToObject(opa.value, 'date'))
  created: string;

  @IsDate()
  @IsOptional()
  @Transform((opa) => QueryFilterToObject(opa.value, 'date'))
  modified: string;
}
