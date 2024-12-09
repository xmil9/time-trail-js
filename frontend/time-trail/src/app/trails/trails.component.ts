import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TrailsService } from '../trails.service';
import { Trail } from '../trail';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-trails',
	standalone: true,
	imports: [MatTableModule],
	templateUrl: './trails.component.html',
	styleUrl: './trails.component.css'
})
export class TrailsComponent {
	private router = inject(Router);
	private trailsService = inject(TrailsService);
	readonly columns: string[] = ['id', 'name'];
	trails: Trail[] = [];

	ngOnInit() {
		this.updateTrails();
	}

	updateTrails() {
		this.trailsService.getTrails()
			.pipe(first())
			.subscribe((trails: Trail[]) => {
				this.trails = trails;
			});
	}

	onTrailClicked(trail: Trail) {
		this.router.navigate(['/trail-events', trail.id]);
	}
}
