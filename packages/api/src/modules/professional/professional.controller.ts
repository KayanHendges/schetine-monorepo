import { Body, Controller, Post, Inject, Get, Query } from '@nestjs/common';
import { QueryFilterToObject } from 'src/utils/dto/QueryFilterToObject';
import {
  CreateProfessionalDTO,
  FindProfessionalDTO,
  ListProfessionalDTO,
} from './professional.dto';
import { IProfessionalService } from './professional.service.interface';

@Controller('professional')
export class ProfessionalController {
  constructor(
    @Inject('IProfessionalService')
    private readonly professionalService: IProfessionalService,
  ) {}

  @Post()
  async create(@Body() body: CreateProfessionalDTO) {
    return this.professionalService.create(body);
  }

  @Get()
  async find(@Query() params: FindProfessionalDTO) {
    return this.professionalService.find(params);
  }

  @Get('list')
  async list(@Query() params: ListProfessionalDTO) {
    console.log(params);
    return this.professionalService.list(params);
  }
}
