import {
  Body,
  Controller,
  Post,
  Inject,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Public } from '../../decorators/public.route.decoratos';
import {
  CreateProfessionalDTO,
  DeleteProfessionalParam,
  emailRegex,
  FindProfessionalDTO,
  ListProfessionalDTO,
  UpdateProfessionalDTO,
  UpdateProfessionalParam,
  usernameRegex,
} from './professional.dto';
import { IProfessionalService } from './professional.service.interface';

@Controller('professional')
export class ProfessionalController {
  constructor(
    @Inject('IProfessionalService')
    private readonly professionalService: IProfessionalService,
  ) {}

  @Public()
  @Post()
  async create(@Body() body: CreateProfessionalDTO) {
    return this.professionalService.create(body);
  }

  @Public()
  @Get(':id')
  async find(@Param() { id }: FindProfessionalDTO) {
    const param = id.match(emailRegex)
      ? { email: id }
      : id.match(usernameRegex)
      ? { username: id }
      : { id };

    return this.professionalService.find(param);
  }

  @Get()
  async list(@Query() params: ListProfessionalDTO) {
    return this.professionalService.list(params);
  }

  @Patch(':id')
  async update(
    @Param() param: UpdateProfessionalParam,
    @Body() professional: UpdateProfessionalDTO,
  ) {
    return this.professionalService.update(param, professional);
  }

  @Delete(':id')
  async delete(@Param() param: DeleteProfessionalParam) {
    return this.professionalService.delete(param);
  }
}
