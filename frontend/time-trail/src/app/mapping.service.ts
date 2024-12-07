import { inject, Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Trail } from './trail';
import { generateColors, generateHslHues, Hsl } from './color';
import { TrailEvent } from './trail-event';
import { HtmlFormatterService } from './html-formatter.service';

@Injectable({
	providedIn: 'root'
})
export class MappingService {
	private formatter = inject(HtmlFormatterService);
	private map?: L.Map;
	
	constructor() { }

	setMap(map: L.Map) {
		this.map = map;
	}

	addTrails(trails: Trail[]) {
		if (!this.map)
			throw new Error('Map not initialized.');

		const trailColors = MappingService.generateTrailColors(trails.length);

		trails.forEach((trail, idx) => {
			this.addTrail(trail, trailColors[idx], 10);
		});
	}

	private addTrail(trail: Trail, color: Hsl, dotScale: number) {
		if (!this.map)
			throw new Error('Map not initialized.');

		const eventColors = MappingService.generateEventColors(color, trail.events.length)

		this.addPath(trail, color);

		trail.events.forEach((event, idx) => {
			this.addEvent(trail, event, eventColors[idx], dotScale);
		});
	}

	private addPath(trail: Trail, color: Hsl) {
		if (!this.map)
			throw new Error('Map not initialized.');

		const path = L.polyline(
			trail.events.map((event) => [event.lat, event.lng]),
			{
				stroke: true,
				weight: 2,
				color: color.toRgb().toString()
			}
		);
		path.bindTooltip(this.formatter.formatTrailContent(trail), { sticky: true });
		path.addTo(this.map);
	}

	private addEvent(trail: Trail, event: TrailEvent, color: Hsl, scale: number) {
		if (!this.map)
			throw new Error('Map not initialized.');

		const marker = L.circle([event.lat, event.lng], {
			color: color.toRgb().toString(),
			radius: MappingService.eventSizeInMeters(event.durationInDays()) * scale
		});
		marker.bindPopup(this.formatter.formatEventContent(trail, event));
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

