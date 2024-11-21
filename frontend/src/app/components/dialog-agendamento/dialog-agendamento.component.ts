import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';
import { IMaskModule } from 'angular-imask';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@Component({
  selector: 'app-dialog-agendamento',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    IMaskModule,
    NgxMatTimepickerModule,
  ],
  templateUrl: './dialog-agendamento.component.html',
  styleUrl: './dialog-agendamento.component.scss',
})
export class DialogAgendamentoComponent {
  constructor(private dialogRef: MatDialogRef<DialogAgendamentoComponent>) {}

  onCLoseModal() {
    this.dialogRef.close(false);
  }
}
