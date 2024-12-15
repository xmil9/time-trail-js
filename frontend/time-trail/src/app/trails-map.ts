import * as L from 'leaflet';
import { Trail, TrailEventPair } from './trail';
import { generateColors, generateHslHues, Hsl } from './color';
import { formatEventAsHtml, formatEventsAsHtml, formatTrailAsHtml } from './html-formatter.service';
import { TrailEvent } from './trail-event';
import { TrailEventMarker } from './trail-event-marker';

export class TrailsMap extends L.Map {
	private trailEventPopup = L.popup();

	constructor() {
		super('map', {
			center: [39.8282, -98.5795],
			zoom: 3
		})
		this.init();
	}

	private init() {
		this.initTiles();
		this.initInteractionEvents();
	}

	private initTiles() {
		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			minZoom: 3,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});

		tiles.addTo(this);
	}

	private initInteractionEvents() {
		this.on('click', this.onMapClicked.bind(this));
	}

	private onMapClicked(e: L.LeafletMouseEvent) {
		const clickedMarkers = this.findTrailEventMarkersAt(e.latlng);
		
		if (clickedMarkers.length > 0) {
			const clickedTrailEvents = clickedMarkers.map(teMarker => <TrailEventPair>{
				trail: teMarker.trail,
				event: teMarker.event
			});
			this.showPopup(formatEventsAsHtml(clickedTrailEvents), e.latlng);
		}
	}

	private findTrailEventMarkersAt(at: L.LatLng) {
		const markers = new Array<TrailEventMarker>();

		this.eachLayer(layer => {
			if (layer instanceof TrailEventMarker) {
				const marker = <TrailEventMarker>layer;
				if (marker.getBounds().contains(at))
					markers.push(marker);
			}
		});

		return markers;
	}

	addTrails(trails: Trail[]) {
		const trailColors = TrailsMap.generateTrailColors(trails.length);

		trails.forEach((trail, idx) => {
			this.addTrail(trail, trailColors[idx], 10);
		});
	}

	private addTrail(trail: Trail, color: Hsl, dotScale: number) {
		const eventColors = TrailsMap.generateEventColors(color, trail.events.length)

		this.addTrailPath(trail, color);

		trail.events.forEach((event, idx) => {
			this.addTrailEvent(trail, event, eventColors[idx], dotScale);
		});
	}

	private addTrailPath(trail: Trail, color: Hsl) {
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

	private addTrailEvent(trail: Trail, event: TrailEvent, color: Hsl, scale: number) {
		const marker = new TrailEventMarker(trail, event, [event.lat, event.lng], {
			color: color.toRgb().toString(),
			radius: TrailsMap.eventSizeInMeters(event.durationInDays()) * scale
		});
		marker.addTo(this);
	}

	private showPopup(content: string, at: L.LatLngExpression) {
		this.trailEventPopup
			.setLatLng(at)
			.setContent(content)
			.openOn(this);
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