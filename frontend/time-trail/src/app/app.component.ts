import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from "./sidenav/sidenav.component";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [MatSidenavModule, RouterOutlet, ToolbarComponent, SidenavComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'time-trail';
}
