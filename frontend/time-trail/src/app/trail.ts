import { Event } from "./event";
import { TrailId } from "./trail-types";

export interface TrailData {
	id: TrailId;
	name: string;
}

export class Trail implements TrailData {
	public events = new Array<Event>();

	constructor(
		public id: TrailId,
		public name: string
	) {}

	addEvent(e: Event): Trail {
		this.events.push(e);
		return this;
	}

	addEvents(es: Event[]): Trail {
		this.events.push(...es);
		return this;
	}

	sortEvents() {
		this.events.sort(Event.compareByStartDate);
	}
};
