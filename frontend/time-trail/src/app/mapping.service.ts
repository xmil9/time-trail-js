import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Trail } from './trail';
import { generateColors, generateHslHues, Hsl } from './color';
import { Event } from './event';

@Injectable({
	providedIn: 'root'
})
export class MappingService {

	constructor(private map: L.Map) { }

	addTrails(trails: Trail[]) {
		const trailColors = MappingService.generateTrailColors(trails.length);

		trails.forEach((trail, idx) => {
			this.addTrail(trail, trailColors[idx], 10);
		});
	}

	addTrail(trail: Trail, color: Hsl, dotScale: number) {
		const eventColors = MappingService.generateEventColors(color, trail.events.length)

		this.addPath(trail, color);

		trail.events.forEach((event, idx) => {
			this.addEvent(event, eventColors[idx], dotScale);
		});
	}

	addPath(trail: Trail, color: Hsl) {
		const path = L.polyline(
			trail.events.map((event) => [event.lat, event.lng]),
			{
				stroke: true,
				weight: 2,
				color: color.toRgb().toString()
			}
		);
		path.addTo(this.map);
	}

	addEvent(event: Event, color: Hsl, scale: number) {
		const marker = L.circle([event.lat, event.lng], {
			color: color.toRgb().toString(),
			radius: MappingService.eventSizeInMeters(event.durationInDays()) * scale
		});
		marker.addTo(this.map);
	}

	private static generateTrailColors(numTrails: number): Array<Hsl> {
		return generateColors(numTrails);
	}

	private static generateEventColors(baseColor: Hsl, numEvents: number): Array<Hsl> {
		return generateHslHues(baseColor, numEvents)
	}

	private static eventSizeInMeters(durationInDays: number): number {
		const minSize = 20;
		return minSize + ((durationInDays >= 0) ? durationInDays : 0);
	}
}

