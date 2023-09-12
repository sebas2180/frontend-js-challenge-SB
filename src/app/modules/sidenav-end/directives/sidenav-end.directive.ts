import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appSidenavEnd]',
    standalone: true,
})
export class SidenavEndDirective {
  constructor(public viewContainer: ViewContainerRef) {
    console.log("viewContainer: ", viewContainer);
  }
}
