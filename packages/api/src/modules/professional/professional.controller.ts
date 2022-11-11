import { Body, Controller, Post, Inject } from '@nestjs/common';
import { CreateProfessionalDTO } from './professional.dto';
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
}
