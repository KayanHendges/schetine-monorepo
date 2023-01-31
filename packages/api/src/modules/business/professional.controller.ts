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
import {
  AssociateProfessional,
  CreateBusinessDTO,
  DeleteBusinessParam,
  DisassociateProfessional,
  FindBusinessDTO,
  ListBusinessDTO,
  UpdateBusinessDTO,
  UpdateBusinessParam,
} from './business.dto';
import { IBusinessService } from './business.service.interface';

@Controller('business')
export class BusinessController {
  constructor(
    @Inject('IBusinessService')
    private readonly businessService: IBusinessService,
  ) {}

  @Post()
  async create(@Body() body: CreateBusinessDTO) {
    return this.businessService.create(body);
  }

  @Post(':businessId/associate/professional/:professionalId')
  async associateProfessional(@Param() params: AssociateProfessional) {
    return this.businessService.associateProfessional(params);
  }

  @Get()
  async find(@Query() params: FindBusinessDTO) {
    return this.businessService.find(params);
  }

  @Get('list')
  async list(@Query() params: ListBusinessDTO) {
    return this.businessService.list(params);
  }

  @Patch(':id')
  async update(
    @Param() param: UpdateBusinessParam,
    @Body() Business: UpdateBusinessDTO,
  ) {
    return this.businessService.update(param, Business);
  }

  @Delete(':id')
  async delete(@Param() param: DeleteBusinessParam) {
    return this.businessService.delete(param);
  }

  @Delete(':businessId/associate/professional/:professionalId')
  async disassociateProfessional(@Param() params: DisassociateProfessional) {
    return this.businessService.disassociateProfessional(params);
  }
}
