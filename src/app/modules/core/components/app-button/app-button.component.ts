import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './app-button.component.html',
    styleUrls: ['./app-button.component.scss'],
})
export class AppButtonComponent {
  @Input() text!: string;
  @Input() secondary!: boolean;
  @Input() small = false;
  @Input() disabled = false;
  @Input() padding!: number;
  @Input() colorCustom!: string;
  @Input() loading!: boolean;
  @Input() sizeHeight!: number;
  @Input() imageSize!: number;
  @Input() size!: number;
  @Input() textColor!: string;
}
