import { compare, zeroPad } from "./util";

export class Time {

	constructor(
		public hour = 0,
		public min = 0,
		public sec = 0,
	) {
		if (hour < 0 || hour > 23)
			throw new Error('Time.hour must be in range [0, 23]."');
		if (min < 0 || min > 59)
			throw new Error('Time.min must be in range [0, 59]."');
		if (sec < 0 || sec > 59)
			throw new Error('Time.sec must be in range [0, 59]."');
	}

	static compare(a: Time, b: Time) {
		if (a.hour !== b.hour)
			return compare(a.hour, b.hour);
		if (b.min !== b.min)
			return compare(a.min, b.min);
		return compare(a.sec, b.sec);
	}

	isEmpty(): boolean {
		return this.hour === 0 && this.min === 0 && this.sec === 0;
	}

	isNotEmpty(): boolean {
		return !this.isEmpty();
	}

	toString() {
		return Time.toReadableString(this);
	}

	///////////////
	// Human readable representation of times

	private static readonly readableStringSeparator = ':';

	static toReadableString(t?: Time): string {
		if (t === undefined || t.isEmpty())
			return '';
		return Time.toStringWithSeparator(t, Time.readableStringSeparator)

	}

	static fromReadableString(str?: string): Time {
		if (!str)
			return new Time();
		return Time.fromStringWithSeparator(str, Time.readableStringSeparator);
	}

	///////////////
	// ISO 8601 representation of dates

	private static readonly iso8601Separator = ':'
	private static readonly iso8601Prefix = 'T'

	static toIso8601String(t?: Time, withPrefix = false): string | undefined {
		if (t === undefined)
			return undefined;

		const prefix = withPrefix ? Time.iso8601Prefix : '';
		return prefix + Time.toStringWithSeparator(t, Time.iso8601Separator);
	}

	static fromIso8601String(str?: string): Time | undefined {
		if (!str)
			return undefined;

		const suffix = str.startsWith(Time.iso8601Prefix) ? str.slice(Time.iso8601Prefix.length) : str;
		return Time.fromStringWithSeparator(suffix, Time.iso8601Separator);
	}

	///////////////

	private static toStringWithSeparator(t: Time, sep: string): string {
		return `${zeroPad(t.hour, 2)}${sep}${zeroPad(t.min, 2)}${sep}${zeroPad(t.sec, 2)}`;
	}

	private static fromStringWithSeparator(str: string, sep: string): Time {
		const hms = str.split(sep);
		const h = hms.length >= 1 ? parseInt(hms[0]) : 0;
		const m = hms.length >= 2 ? parseInt(hms[1]) : 0;
		const s = hms.length >= 3 ? parseInt(hms[2]) : 0;
		return new Time(h, m, s);
	}
}
