import { NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AppButtonComponent } from 'src/app/modules/core/components/app-button/app-button.component';

export interface SuccessDialogData {
  title?: string;
  message: string;
  success?: boolean;
  accept_label?: string;
  accept_size?: number;

  //estos atributos fueron agregados para manejar la notificación de invitación a meeting room
  reject_label?: string;
  reject_size?: number;
  name?: string;
  lastname?: string;
  meeting_room_name?: string;
}

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    NgIf,
    MatDialogModule,
    AppButtonComponent,
  ]
})
export class SuccessDialogComponent implements OnInit {
  onResult = new EventEmitter();

  acceptLabel = 'UNDERSTOOD';
  acceptSize = 250;
  success = false;

  style;

  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuccessDialogData
  ) {
    if (this.data.accept_label) this.acceptLabel = this.data.accept_label;
    if (this.data.accept_size) this.acceptSize = this.data.accept_size;
    if (this.data.success) this.success = this.data.success;
  }

  generateStyle() {
    return { 'flex-direction': 'column' };
  }
  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }
  reject() {
    this.onResult.emit('reject');
    this.close();
  }
  accept() {
    this.onResult.emit(true);
    this.close();
  }

  cancel() {
    this.onResult.emit(false);
    this.close();
  }
}
