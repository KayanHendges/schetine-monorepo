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
  CurrentProfessional,
  CurrentProfessionalPayload,
} from '../../decorators/current.professional.decorator';
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
  async create(
    @CurrentProfessional() professional: CurrentProfessionalPayload,
    @Body() body: CreateBusinessDTO,
  ) {
    return this.businessService.create(professional.id, body);
  }

  @Post(':businessId/associate/professional/:professionalId')
  async associateProfessional(
    @CurrentProfessional() professional: CurrentProfessionalPayload,
    @Param() params: AssociateProfessional,
  ) {
    return this.businessService.associateProfessional(professional.id, params);
  }

  @Get(':id')
  async find(@Param() params: FindBusinessDTO) {
    return this.businessService.find(params);
  }

  @Get()
  async list(@Query() params: ListBusinessDTO) {
    return this.businessService.list(params);
  }

  @Patch(':id')
  async update(
    @CurrentProfessional() professional: CurrentProfessionalPayload,
    @Param() param: UpdateBusinessParam,
    @Body() Business: UpdateBusinessDTO,
  ) {
    return this.businessService.update(professional.id, param, Business);
  }

  @Delete(':id')
  async delete(
    @CurrentProfessional() professional: CurrentProfessionalPayload,
    @Param() param: DeleteBusinessParam,
  ) {
    return this.businessService.delete(professional.id, param);
  }

  @Delete(':businessId/associate/professional/:professionalId')
  async disassociateProfessional(
    @CurrentProfessional() professional: CurrentProfessionalPayload,
    @Param() params: DisassociateProfessional,
  ) {
    return this.businessService.disassociateProfessional(
      professional.id,
      params,
    );
  }
}
