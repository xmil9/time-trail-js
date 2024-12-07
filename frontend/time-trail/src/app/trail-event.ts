import { Date } from "./date";
import { TrailEventId, TrailId } from "./trail-types";

export interface TrailEventData {
	id: TrailEventId;
	label: string;
	lat: number;
	lng: number;
	start: string;
	trailId: TrailId;
	order: number;
	end?: string;
}

export class TrailEvent {

	constructor(
		public id: TrailEventId,
		public label: string,
		public lat: number,
		public lng: number,
		public start: Date,
		public trailId: TrailId,
		public order: number,
		public end?: Date,
	){}

	get description(): string {
		let descr = `${ this.label }<br>${ this.start }`;
		if (this.end)
			descr += ' - ' + this.end.toString();
		return descr;

	}

    durationInDays(): number {
        if (!this.end)
            return 0.0;

        const deltaYears = this.end.year - this.start.year;
        const deltaMonths = this.end.month  - this.start.month;
        const deltaDays = this.end.day - this.start.day;
        return deltaYears * 365.25 + deltaMonths * 30.437 + deltaDays
    }

	static compareByStartDate(a: TrailEvent, b: TrailEvent): number {
		return Date.compare(a.start, b.start);
	}
};
