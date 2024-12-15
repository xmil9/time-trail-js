import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, mergeMap, Observable, tap, toArray } from 'rxjs';
import { makeUrl } from './util';
import { Trail, TrailData } from './trail';
import { TrailId } from './trail-types';
import { TrailEvent, TrailEventData } from './trail-event';
import { Date } from './date';
import { makeUrlToGetTrailEvents, makeUrlToGetTrails } from '../backend-api';

@Injectable({
  providedIn: 'root'
})
export class TrailsService {
	constructor(private http: HttpClient) { }

	getTrails(): Observable<Trail[]> {
		const url = makeUrlToGetTrails();

		return this.http.get<TrailData[]>(url).pipe(
			// Break array into individual trails.
			mergeMap(trails => from(trails)),
			// Create trail objects from pure data.
			map(trailData => new Trail(trailData.id, trailData.name)),
			// Query events and add to trail.
			mergeMap(trail => this.getEvents(trail.id).pipe(
				map(events => trail.addEvents(events))
			)),
			// Combine back into array.
			toArray()
		);
	}

	getEvents(trailId: TrailId): Observable<TrailEvent[]> {
		const url = makeUrlToGetTrailEvents(trailId);
		
		return this.http.get<TrailEventData[]>(url).pipe(
			// Break array into individual events.
			mergeMap(events => from(events)),
			// Create event objects from pure data.
			map(eventData => new TrailEvent(
				eventData.id,
				eventData.label,
				eventData.lat,
				eventData.lng,
				TrailsService.makeRequiredDate(eventData.start),
				eventData.trailId,
				eventData.order,
				TrailsService.makeOptionalDate(eventData.end))
			),
			// Combine back into array.
			toArray()
		);
	}

	private static makeRequiredDate(dateStr?: string): Date {
		const date = Date.fromIso8601String(dateStr);
		if (!date)
			throw new Error('Missing required date.');
		return date;
	}

	private static makeOptionalDate(dateStr?: string): Date | undefined {
		return Date.fromIso8601String(dateStr);
	}
}
