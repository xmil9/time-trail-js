import * as L from 'leaflet';
import { TrailEvent } from './trail-event';
import { Trail } from './trail';

export class TrailEventMarker extends L.Circle {
	readonly trail: Trail;
	readonly event: TrailEvent;

	constructor(trail: Trail, event: TrailEvent, latlng: L.LatLngExpression, options: L.CircleMarkerOptions) {
		super(latlng, options);
		this.trail = trail;
		this.event = event;
	}
}