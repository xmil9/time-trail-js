import { Injectable } from '@angular/core';
import { Event } from './event';
import { Trail } from './trail';

@Injectable({
  providedIn: 'root'
})
export class HtmlFormatterService {

  constructor() { }

  formatTrailContent(trail: Trail) {
	return `<div>${ trail.name }</div>`;
  }

  formatEventContent(trail: Trail, trailEvent: Event): string {
	return `` +
		`<div><b>${ trail.name }</b></div>` +
		`<br>` +
		`<div>${ trailEvent.description }</div>`;
  }
}
