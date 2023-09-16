import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  BusinessInclude,
  BusinessIncludeOption,
} from '../../repositories/business/business.repository.interface';
import { Business } from '../../entities/business';
import {
  handleEnumErrorMessage,
  PaginationAndSortDTO,
} from '../../utils/dto/global.dto';

export class CreateBusinessDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
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
  id?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  ownerId?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  created?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  modified?: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  associatedProfessionalId?: string;

  @IsArray()
  @IsEnum(BusinessInclude, {
    each: true,
    message: handleEnumErrorMessage,
  })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(' ', '').split(',') : value,
  )
  include: BusinessIncludeOption[];
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

export class AssociateProfessional {
  @IsString()
  @IsNotEmpty()
  businessId: string;

  @IsString()
  @IsNotEmpty()
  professionalId: string;
}

export class DisassociateProfessional {
  @IsString()
  @IsNotEmpty()
  businessId: string;

  @IsString()
  @IsNotEmpty()
  professionalId: string;
}
