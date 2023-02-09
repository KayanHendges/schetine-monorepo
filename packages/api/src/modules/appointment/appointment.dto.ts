import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Appointment } from '../../entities/appointment';
import { PaginationAndSortDTO } from '../../utils/dto/global.dto';

export class CreateAppointmentDTO {
  @IsString()
  @IsNotEmpty()
  businessId: string;

  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsDate()
  @Type(() => Date)
  start: Date;

  @IsDate()
  @Type(() => Date)
  end: Date;

  @IsNumber()
  duration: number;
}

export class FindAppointmentDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id: string;
}

export class ListAppointmentDTO extends PaginationAndSortDTO<Appointment> {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  code?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  businessId?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  clientId?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  start?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  end?: Date;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  duration?: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  created?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  modified?: Date;
}

export class UpdateAppointmentParam {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UpdateAppointmentDTO {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  code?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  start?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  end?: Date;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  duration?: number;
}

export class DeleteAppointmentParam {
  @IsString()
  @IsNotEmpty()
  id: string;
}
