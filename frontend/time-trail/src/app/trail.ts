import { Event } from "./event";
import { TrailId } from "./trail-types";

export class Trail {
	private events = new Array<Event>();

	constructor(
		public id: TrailId,
		public name: string
	) {}

	addEvent(e: Event): Trail {
		this.events.push(e);
		return this;
	}

	sortEvents() {
		this.events.sort(Event.compareByStartDate);
	}
};
