import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Trail } from './trail';
import { Hsl } from './color';

@Injectable({
  providedIn: 'root'
})
export class MappingService {

  	constructor(private map: L.Map) {}

	addTrail(trail: Trail, color: Hsl, dotScale: number) {
		trail.events.forEach((event) => {
			const marker = L.circleMarker([event.lat, event.lng])
				.setStyle({ color: color.toRgb().toString() });
			marker.addTo(this.map);
		});
	}
}
