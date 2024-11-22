import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service';
import { Agendamento } from './agendamento.entity';

@Controller('agendamentos')
export class AgendamentosController {
  constructor(private readonly agendamentosService: AgendamentosService) {}

  @Get()
  findAll(): Promise<Agendamento[]> {
    return this.agendamentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Agendamento> {
    return this.agendamentosService.findOne(id);
  }

  @Post()
  create(@Body() agendamento: Partial<Agendamento>): Promise<Agendamento> {
    return this.agendamentosService.create(agendamento);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.agendamentosService.remove(id);
  }
}
