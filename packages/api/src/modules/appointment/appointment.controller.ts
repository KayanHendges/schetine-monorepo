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
  CreateClientDTO,
  DeleteClientParam,
  FindClientDTO,
  ListClientDTO,
  UpdateClientDTO,
  UpdateClientParam,
} from './appointment.dto';
import { IClientService } from './appointment.service.interface';

@Controller('client')
export class ClientlController {
  constructor(
    @Inject('IClientService')
    private readonly clientService: IClientService,
  ) {}

  @Post()
  async create(@Body() body: CreateClientDTO) {
    return this.clientService.create(body);
  }

  @Get()
  async find(@Query() params: FindClientDTO) {
    return this.clientService.find(params);
  }

  @Get('list')
  async list(@Query() params: ListClientDTO) {
    return this.clientService.list(params);
  }

  @Patch(':id')
  async update(
    @Param() param: UpdateClientParam,
    @Body() client: UpdateClientDTO,
  ) {
    return this.clientService.update(param, client);
  }

  @Delete(':id')
  async delete(@Param() param: DeleteClientParam) {
    return this.clientService.delete(param);
  }
}
