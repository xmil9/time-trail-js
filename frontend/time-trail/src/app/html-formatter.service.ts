import { Injectable } from '@angular/core';
import { TrailEvent } from './trail-event';
import { Trail } from './trail';

@Injectable({
  providedIn: 'root'
})
export class HtmlFormatterService {

  constructor() { }

  formatTrailContent(trail: Trail) {
	return `<div>${ trail.name }</div>`;
  }

  formatEventContent(trail: Trail, trailEvent: TrailEvent): string {
	return `` +
		`<div><b>${ trail.name }</b></div>` +
		`<br>` +
		`<div>${ trailEvent.description }</div>`;
  }
}
