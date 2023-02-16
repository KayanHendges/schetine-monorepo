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
  CreateAppointmentDTO,
  DeleteAppointmentParam,
  FindAppointmentDTO,
  ListAppointmentDTO,
  UpdateAppointmentDTO,
  UpdateAppointmentParam,
} from './appointment.dto';
import { IAppointmentService } from './appointment.service.interface';

@Controller('appointments')
export class AppointmentController {
  constructor(
    @Inject('IAppointmentService')
    private readonly appointmentService: IAppointmentService,
  ) {}

  @Post()
  async create(
    @CurrentProfessional() professional: CurrentProfessionalPayload,
    @Body() body: CreateAppointmentDTO,
  ) {
    return this.appointmentService.create(professional.id, body);
  }

  @Get(':id')
  async find(@Param() params: FindAppointmentDTO) {
    return this.appointmentService.find(params);
  }

  @Get()
  async list(@Query() params: ListAppointmentDTO) {
    return this.appointmentService.list(params);
  }

  @Patch(':id')
  async update(
    @CurrentProfessional() professional: CurrentProfessionalPayload,
    @Param() param: UpdateAppointmentParam,
    @Body() client: UpdateAppointmentDTO,
  ) {
    return this.appointmentService.update(professional.id, param, client);
  }

  @Delete(':id')
  async delete(
    @CurrentProfessional() professional: CurrentProfessionalPayload,
    @Param() param: DeleteAppointmentParam,
  ) {
    return this.appointmentService.delete(professional.id, param);
  }
}
