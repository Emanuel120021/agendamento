import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agendamento } from './agendamento.entity';

@Injectable()
export class AgendamentosService {
  constructor(
    @InjectRepository(Agendamento)
    private agendamentosRepository: Repository<Agendamento>,
  ) {}

  findAll(): Promise<Agendamento[]> {
    return this.agendamentosRepository.find();
  }

  findOne(id: number): Promise<Agendamento> {
    return this.agendamentosRepository.findOneBy({ id });
  }

  create(agendamento: Partial<Agendamento>): Promise<Agendamento> {
    const novoAgendamento = this.agendamentosRepository.create(agendamento);
    return this.agendamentosRepository.save(novoAgendamento);
  }

  async remove(id: number): Promise<void> {
    await this.agendamentosRepository.delete(id);
  }
}
