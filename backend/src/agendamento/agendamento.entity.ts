import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  congregacao: string;

  @Column()
  numero_contato: string;

  @Column('time')
  hora_inicio: string;

  @Column('time')
  hora_fim: string;
}
