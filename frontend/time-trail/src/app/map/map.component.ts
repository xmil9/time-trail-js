import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import { TrailsService } from '../trails.service';
import { Trail } from '../trail';
import { take } from 'rxjs';
import { TrailsMap } from '../trails-map';

@Component({
	selector: 'app-map',
	standalone: true,
	imports: [],
	templateUrl: './map.component.html',
	styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
	private cd = inject(ChangeDetectorRef);
	private trailsService = inject(TrailsService);
	private map?: TrailsMap;

	constructor() { }

	ngAfterViewInit(): void {
		this.initMap();
		this.initTrails();
		this.cd.detectChanges();
	}

	private initMap(): void {
		this.map = new TrailsMap();
	}

	private initTrails() {
		this.trailsService.getTrails().pipe(take(1)).subscribe(trails =>{
			this.addTrails(trails);
		});
	}

	private addTrails(trails: Trail[]) {
		this.map?.addTrails(trails);
	}
}
