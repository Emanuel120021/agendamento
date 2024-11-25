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
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { DialogAgendamentoComponent } from '../../components/dialog-agendamento/dialog-agendamento.component';
import { MatIconModule } from '@angular/material/icon';
import { LoginLiderancaComponent } from '../../components/login-lideranca/login-lideranca.component';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FullCalendarModule, MatIconModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent {
  calendarVisible: boolean = true;
  currentEvents: EventApi[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: '',
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
    // eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    dateClick: this.handleDateClick.bind(this), // Garante que cliques em dias também abram o modal
  };

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    if (this.dialog.openDialogs.length > 0) {
      return; // Evita abrir múltiplos modais
    }
    this.openModal(selectInfo.startStr); // Passa a data selecionada para o modal
  }

  handleDateClick(dateInfo: any) {
    if (this.dialog.openDialogs.length > 0) {
      return; // Evita abrir múltiplos modais
    }
    this.openModal(dateInfo.dateStr); // Para dispositivos onde o `select` não funciona
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
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  openModal(date?: any): void {
    this.dialog.open(DialogAgendamentoComponent, {
      width: '700px', // Largura do modal
      height: '500px',
      data: { message: 'Mensagem passada para o modal!' }, // Dados opcionais
    });
  }

  openModalLogin() {
    this.dialog.open(LoginLiderancaComponent, {
      width: '400px',
      height: '400px',
    });
  }
}
