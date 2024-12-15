import * as L from 'leaflet';
import { Trail } from './trail';
import { generateColors, generateHslHues, Hsl } from './color';
import { formatEventAsHtml, formatTrailAsHtml } from './html-formatter.service';
import { TrailEvent } from './trail-event';

export class TrailsMap extends L.Map {

	constructor() {
		super('map', {
			center: [39.8282, -98.5795],
			zoom: 3
		})
		this.init();
	}

	private init() {
		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			minZoom: 3,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});

		tiles.addTo(this);
	}

	addTrails(trails: Trail[]) {
		const trailColors = TrailsMap.generateTrailColors(trails.length);

		trails.forEach((trail, idx) => {
			this.addTrail(trail, trailColors[idx], 10);
		});
	}

	private addTrail(trail: Trail, color: Hsl, dotScale: number) {
		const eventColors = TrailsMap.generateEventColors(color, trail.events.length)

		this.addPath(trail, color);

		trail.events.forEach((event, idx) => {
			this.addEvent(trail, event, eventColors[idx], dotScale);
		});
	}

	private addPath(trail: Trail, color: Hsl) {
		const path = L.polyline(
			trail.events.map((event) => [event.lat, event.lng]), {
				stroke: true,
				weight: 2,
				color: color.toRgb().toString()
			}
		);
		path.bindTooltip(formatTrailAsHtml(trail), { sticky: true });
		path.addTo(this);
	}

	private addEvent(trail: Trail, event: TrailEvent, color: Hsl, scale: number) {
		const marker = L.circle([event.lat, event.lng], {
			color: color.toRgb().toString(),
			radius: TrailsMap.eventSizeInMeters(event.durationInDays()) * scale
		});
		marker.bindPopup(formatEventAsHtml(trail, event));
		marker.addTo(this);
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