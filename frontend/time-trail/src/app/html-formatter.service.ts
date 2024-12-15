import { TrailEvent } from './trail-event';
import { Trail, TrailEventPair } from './trail';

export function formatTrailAsHtml(trail: Trail) {
	return `<div>${trail.name}</div>`;
}

export interface TrailEventFormat {
	dense: boolean;
};
export function formatEventAsHtml(
	trail: Trail,
	trailEvent: TrailEvent
): string {
	return `` +
		`<h4>${trail.name}</h4>` +
		`<div>${trailEvent.description}</div>`;
}

export function formatEventsAsHtml(events: Array<TrailEventPair>): string {
	if (!events)
		return '';
	if (events.length === 1)
		return formatEventAsHtml(events[0].trail, events[0].event);

	let html = `<h3>${events.length} Events</h3>`;
	events.forEach(pair => {
		html += formatEventAsHtml(pair.trail, pair.event);
	});

	return html;
}
