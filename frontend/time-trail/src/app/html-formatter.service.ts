import { TrailEvent } from './trail-event';
import { Trail } from './trail';

export function formatTrailAsHtml(trail: Trail) {
	return `<div>${trail.name}</div>`;
}

export function formatEventAsHtml(trail: Trail, trailEvent: TrailEvent): string {
	return `` +
		`<div><b>${trail.name}</b></div>` +
		`<br>` +
		`<div>${trailEvent.description}</div>`;
}
