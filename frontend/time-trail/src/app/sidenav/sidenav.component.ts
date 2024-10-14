import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
	selector: 'app-sidenav',
	standalone: true,
	imports: [MatButton, MatIconButton, MatIconModule, RouterLink],
	templateUrl: './sidenav.component.html',
	styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

}
