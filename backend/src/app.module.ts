import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgendamentosService } from './agendamento/agendamentos.service';
import { AgendamentosController } from './agendamento/agendamentos.controller';
import { Agendamento } from './agendamento/agendamento.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // Tipo do banco
      database: '../../db.sqlite', // Caminho do arquivo SQLite
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Localização das entidades
      synchronize: true, // Atualiza o banco automaticamente (não use em produção)
    }),
  ],
  providers: [AgendamentosService],
  controllers: [AgendamentosController],
})
export class AgendamentosModule {}
