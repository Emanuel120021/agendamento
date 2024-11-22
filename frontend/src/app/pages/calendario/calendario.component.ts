import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { DialogAgendamentoComponent } from '../../components/dialog-agendamento/dialog-agendamento.component';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent {
  calendarVisible: boolean = true; // Substituído por uma propriedade boolean
  currentEvents: EventApi[] = []; // Substituído por uma array simples
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    height: '85vh',
    locale: ptBrLocale,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // Atualiza diretamente a propriedade
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.openModal();
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events; // Atualiza diretamente a array
    this.changeDetector.detectChanges(); // Atualiza a view manualmente se necessário
  }

  openModal(): void {
    this.dialog.open(DialogAgendamentoComponent, {
      width: '700px', // Largura do modal
      height: '500px',
      data: { message: 'Mensagem passada para o modal!' }, // Dados opcionais
    });
  }
}
