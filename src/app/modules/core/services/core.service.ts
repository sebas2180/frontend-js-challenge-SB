import { Injectable, NgZone } from '@angular/core';
import { SuccessDialogComponent } from '../../dialogs/components/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { InformationSnackBarComponent } from '../../dialogs/components/information-snack-bar/information-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
    constructor(
        private dialog: MatDialog,
        private zone: NgZone,
        private snackBar: MatSnackBar,
    ) {}

    public showSnackBar(text: string, duration = 4000, moreText?) {
        this.zone.run(() => {
          this.snackBar.openFromComponent(InformationSnackBarComponent, {
            data: { text, moreText},
            duration: duration,
            verticalPosition: 'top',
          });
        });
      }


    public manageSuccessDialog(
        dialog,
        title,
        message,
        width,
        acceptedCallback = () => {},
        discartedCallback = () => {},
        acceptLabel = 'ACCEPT',
        success?,
      ) {
        dialog = this.dialog.open(SuccessDialogComponent, {
          width: width ? width : '60%',
          disableClose: true,
          data: {
            title,
            message,
            accept_label: acceptLabel,
            success: success,
          },
        });
        dialog.componentInstance.onResult.subscribe((_) => {
          acceptedCallback();
        });
        dialog.afterClosed().subscribe((_) => dialog.componentInstance.onResult.unsubscribe());
      }
    
}
