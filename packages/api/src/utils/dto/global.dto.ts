import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';
import { OrderParam } from '../../types';
import { orderByFromString } from './orderByFromString';

export class PaginationAndSortDTO<T> {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  public page = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Max(1000)
  @Type(() => Number)
  public pageSize = 100;

  @IsOptional()
  @IsObject({
    message:
      'orderBy must have the following format: key_direction(asc or desc)',
  })
  @Transform((value) => orderByFromString<T>(value.value))
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
