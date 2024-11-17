import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TrailsService } from '../trails.service';
import { Trail } from '../trail';

@Component({
	selector: 'app-trails',
	standalone: true,
	imports: [MatTableModule],
	templateUrl: './trails.component.html',
	styleUrl: './trails.component.css'
})
export class TrailsComponent {
	readonly columns: string[] = ['id', 'name'];
	trails: Trail[] = [];

	constructor(private trailsService: TrailsService) { }

	ngOnInit() {
		this.updateWords();
	}

	updateWords() {
		this.trailsService.getTrails().subscribe((trails: Trail[]) => {
			this.trails = trails;
		});
	}
}
