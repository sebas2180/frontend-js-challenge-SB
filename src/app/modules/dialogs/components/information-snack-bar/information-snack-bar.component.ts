import { NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-information-snack-bar',
  templateUrl: './information-snack-bar.component.html',
  styleUrls: ['./information-snack-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarModule,
    NgIf,
  ]
})
export class InformationSnackBarComponent implements OnInit {
  public informationSnackBarComponent: any;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              ) {}

  ngOnInit() {}

  close() {
    this.informationSnackBarComponent.dismiss();
  }
}
