import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-menu-small',
    templateUrl: './menu-small.component.html',
    styleUrls: ['./menu-small.component.scss'],
    standalone: true,
    imports: [RouterLinkActive, RouterLink],
})
export class MenuSmallComponent {}
