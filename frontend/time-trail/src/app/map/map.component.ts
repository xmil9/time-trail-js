import { AfterViewInit, ChangeDetectorRef, Component, inject } from '@angular/core';
import * as L from 'leaflet';
import { TrailsService } from '../trails.service';
import { Trail } from '../trail';
import { MappingService } from '../mapping.service';
import { take } from 'rxjs';

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
	private mappingService = inject(MappingService);
	private map?: L.Map;

	constructor() { }

	ngAfterViewInit(): void {
		this.initMap();
		this.mappingService.setMap(this.map!);
		this.initTrails();
		this.cd.detectChanges();
	}

	private initMap(): void {
		this.map = L.map('map', {
			center: [39.8282, -98.5795],
			zoom: 3
		});

		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			minZoom: 3,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});

		tiles.addTo(this.map);
	}

	private initTrails() {
		if (!this.map)
			throw new Error('Map not initialized.');
		
		this.trailsService.getTrails().pipe(take(1)).subscribe(trails =>{
			this.addTrails(trails);
		});
	}

	private addTrails(trails: Trail[]) {
		if (!this.mappingService)
			throw new Error('Mapping service not initialized.');
		this.mappingService.addTrails(trails);
	}
}
