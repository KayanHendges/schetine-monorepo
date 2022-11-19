import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { OrderParam } from '../../types';

export class PaginationAndSortDTO<T> {
  @IsOptional()
  @IsInt()
  @IsPositive()
  public page?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  public pageSize?: number;

  @IsOptional()
  @IsObject()
  orderBy: OrderParam<T>;
}

export class IntFilter {
  @IsOptional()
  @IsNumber()
  equals?: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  in?: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  notIn?: number[];

  @IsOptional()
  @IsNumber()
  lt?: number;

  @IsOptional()
  @IsNumber()
  lte?: number;

  @IsOptional()
  @IsNumber()
  gt?: number;

  @IsOptional()
  @IsNumber()
  gte?: number;

  @IsOptional()
  @IsNumber()
  not?: number;
}

export class BoolFilter {
  @IsOptional()
  @IsBoolean()
  equals?: boolean;

  @IsOptional()
  @IsBoolean()
  not?: boolean;
}

export class StringFilter {
  @IsOptional()
  @IsString()
  equals?: string;

  @IsOptional()
  @IsString({ each: true })
  in?: string[];

  @IsOptional()
  @IsString({ each: true })
  notIn?: string[];

  @IsOptional()
  @IsString()
  lt?: string;

  @IsOptional()
  @IsString()
  lte?: string;

  @IsOptional()
  @IsString()
  gt?: string;

  @IsOptional()
  @IsString()
  gte?: string;

  @IsOptional()
  @IsString()
  contains?: string;

  @IsOptional()
  @IsString()
  startsWith?: string;

  @IsOptional()
  @IsString()
  endsWith?: string;

  @IsOptional()
  @IsString()
  not?: string;
}

export class DateTimeFilter {
  @IsOptional()
  @IsDate()
  equals?: Date;

  @IsOptional()
  @IsDate({ each: true })
  in?: Date[];

  @IsOptional()
  @IsDate({ each: true })
  notIn?: Date[];

  @IsOptional()
  @IsDate()
  lt?: Date;

  @IsOptional()
  @IsDate()
  lte?: Date;

  @IsOptional()
  @IsDate()
  gt?: Date;

  @IsOptional()
  @IsDate()
  gte?: Date;

  @IsOptional()
  @IsDate()
  not?: Date;
}
