import { Component, inject, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TrailId } from '../trail-types';
import { TrailEvent } from '../trail-event';
import { TrailsService } from '../trails.service';
import { first } from 'rxjs';

@Component({
	selector: 'app-trail-events',
	standalone: true,
	imports: [MatTableModule],
	templateUrl: './trail-events.component.html',
	styleUrl: './trail-events.component.css'
})
export class TrailEventsComponent {
	private trailsService = inject(TrailsService);
	readonly columns: string[] = ['id', 'label', 'lat', 'lng', 'start', 'end'];
	private currentTrailId: TrailId = 0;
	trailEvents: TrailEvent[] = [];

	@Input()
	set trailId(routeTrailId: string) {
		this.currentTrailId = parseInt(routeTrailId);
		if (isNaN(this.currentTrailId))
			throw new Error('Unable to display trail events. Invalid trail id.');
		this.updateTrailEvents();
	}
	
	updateTrailEvents() {
		this.trailsService.getEvents(this.currentTrailId)
			.pipe(first())
			.subscribe((trailEvents: TrailEvent[]) => {
				this.trailEvents = trailEvents;
			});
	}
}
