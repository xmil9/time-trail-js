import { TrailEvent } from "./trail-event";
import { TrailId } from "./trail-types";

export interface TrailData {
	id: TrailId;
	name: string;
}

export class Trail implements TrailData {
	public events = new Array<TrailEvent>();

	constructor(
		public id: TrailId,
		public name: string
	) {}

	addEvent(e: TrailEvent): Trail {
		this.events.push(e);
		return this;
	}

	addEvents(es: TrailEvent[]): Trail {
		this.events.push(...es);
		return this;
	}

	sortEvents() {
		this.events.sort(TrailEvent.compareByStartDate);
	}
};

export interface TrailEventPair {
	trail: Trail;
	event: TrailEvent;
}