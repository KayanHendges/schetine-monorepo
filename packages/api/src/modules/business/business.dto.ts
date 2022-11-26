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
import { Business } from '../../entities/business';
import { PaginationAndSortDTO } from '../../utils/dto/global.dto';

const usernameRegex = /^(?=[a-z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/g;

export class CreateBusinessDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}

export class FindBusinessDTO {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @IsOptional()
  id: string;
}

export class ListBusinessDTO extends PaginationAndSortDTO<Business> {
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
  ownerId: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  created: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  modified: Date;
}

export class UpdateBusinessParam {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class UpdateBusinessDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
}

export class DeleteBusinessParam {
  @IsString()
  @IsNotEmpty()
  id: string;
}
