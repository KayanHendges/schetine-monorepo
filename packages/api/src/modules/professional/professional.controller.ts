import {
  Body,
  Controller,
  Post,
  Inject,
  Get,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import {
  CreateProfessionalDTO,
  FindProfessionalDTO,
  ListProfessionalDTO,
  UpdateProfessionalDTO,
  UpdateProfessionalParam,
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
    return this.professionalService.list(params);
  }

  @Patch(':id')
  async update(
    @Param() id: UpdateProfessionalParam,
    @Body() professional: UpdateProfessionalDTO,
  ) {
    return this.professionalService.update(id, professional);
  }
}
