import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { Client } from '../../entities/client';
import { PaginationAndSortDTO } from '../../utils/dto/global.dto';

const cpfRegex = /[0-9]{11}/g;

export class CreateClientDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  businessId: string;

  @IsPhoneNumber('BR')
  @IsString()
  @IsOptional()
  phone: string | null = null;

  @IsDate()
  @IsOptional()
  birth: Date | null = null;

  @IsString()
  @Matches(cpfRegex)
  @IsOptional()
  cpf: string | null = null;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string | null = null;

  @IsString()
  @IsOptional()
  comment: string | null = null;
}

export class FindClientDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id: string;
}

export class ListClientDTO extends PaginationAndSortDTO<Client> {
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
  businessId: string;

  @IsPhoneNumber('BR')
  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @Matches(cpfRegex)
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  created: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  modified: Date;
}

export class UpdateClientParam {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UpdateClientDTO {
  @IsPhoneNumber('BR')
  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @Matches(cpfRegex)
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  comment?: string;
}

export class DeleteClientParam {
  @IsString()
  @IsNotEmpty()
  id: string;
}
