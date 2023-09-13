import { Component, OnInit, ViewEncapsulation, Inject, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { NgIf } from '@angular/common';
import { AppButtonComponent } from 'src/app/modules/core/components/app-button/app-button.component';

export interface DialogData {
  title?: string;
  message: string;
  accept_label?: string;
  dismiss_label?: string;
  close?: boolean;
}

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, MatDialogModule, AppButtonComponent]
})
export class ConfirmDialogComponent implements OnInit {
  onResult = new EventEmitter();
  acceptLabel = 'ACCEPT';
  dismissLabel = 'CANCEL';
  icon = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if (data.accept_label) this.acceptLabel = data.accept_label;
    if (data.dismiss_label) this.dismissLabel = data.dismiss_label;
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
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
