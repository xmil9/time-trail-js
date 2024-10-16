import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
	selector: 'app-map',
	standalone: true,
	imports: [],
	templateUrl: './map.component.html',
	styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
	private map?: L.Map;

	constructor(private cd: ChangeDetectorRef) { }

	ngAfterViewInit(): void {
		this.initMap();
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
}
