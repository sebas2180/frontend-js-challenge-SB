import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-menu-medium',
    templateUrl: './menu-medium.component.html',
    styleUrls: ['./menu-medium.component.scss'],
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
})
export class MenuMediumComponent {}
