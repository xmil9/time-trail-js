import { Time } from "./time";
import { compare, zeroPad } from "./util";

export class Date {
	constructor(
		public year: number,
		public month = 0,
		public day = 0, // 0..31
		public time = new Time()
	) {
		if (month < 0 || month > 12)
			throw new Error('Date.month must be in range [0, 12]."');
		if (day < 0 || day > 31)
			throw new Error('Date.day must be in range [0, 31]."');
	}

	static compare(a: Date, b: Date) {
		if (a.year !== b.year)
			return compare(a.year, b.year);
		if (b.month !== b.month)
			return compare(a.month, b.month);
		if (b.day !== b.day)
			return compare(a.day, b.day);
		return Time.compare(a.time, b.time);
	}

	toString() {
		return Date.toReadableString(this);
	}

    nonZeroMonth(): number {
        return this.month > 0 ? this.month : 1;
    }

    nonZeroDay(): number {
        return this.day > 0 ? this.day : 1
    }

	static julianDays(d: Date): number {
		const a = Math.floor((14 - d.nonZeroMonth()) / 12);
		const y = d.year + 4800 - a;
		const m = d.nonZeroMonth() + 12 * a - 3;
		return d.day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
	}

	///////////////
	// Human readable representation of dates.

	static toReadableString(d?: Date): string {
		if (d === undefined)
			return '';

		let str = d.day === 0 ? '' : d.day.toFixed();
		if (d.month != 0)
			str += ` ${Date.monthToReadableString(d.month)}`;
		str += ` ${d.year}`;
		return str;
	}

	static fromReadableString(str: string): Date | undefined{
		if (str.length === 0)
			return undefined;

		const fields = str.split(" ");
		if (fields.length === 0)
			return undefined;

		let idx = 0;
		const d = (fields.length >= 3) ? parseInt(fields[idx++]) : 0;
		const m = (fields.length >= 2) ? Date.monthFromReadableString(fields[idx++]) : 0;
		const y = parseInt(fields[idx]);
		// Ignore time for now.
		const t = new Time();

		// Note - Invalid values for each field will be detected during date construction.
		return new Date(y, m, d, t)
	}

	private static readonly monthReadable = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];

	private static monthToReadableString(month: number): string {
		if (month >= 1 && month <= 12)
			return Date.monthReadable[month - 1];
		return '';
	}


	private static monthFromReadableString(month: string): number {
		// When not found -1 is correctly converted to 0.
		return Date.monthReadable.indexOf(month) + 1;
	}

	///////////////
	// ISO 8601 representation of dates.

	private static readonly iso8601Separator = '-'

	static toIso8601String(d?: Date): string | undefined {
		if (!d)
			return undefined;
		return Date.toStringWithSeparator(d, Date.iso8601Separator, false);
	}

	static fromIso8601String(str?: string): Date | undefined {
		if (!str)
			return undefined;
		return Date.fromStringWithSeparator(str, Date.iso8601Separator);
	}

	private static toStringWithSeparator(d: Date, sep: string, withEmptyTime: boolean): string {
		let str = `${zeroPad(d.year, 4)}${sep}${zeroPad(d.month, 4)}${sep}${zeroPad(d.day, 4)}`;
		if (withEmptyTime || d.time.isNotEmpty())
			str += sep + Time.toIso8601String(d.time);
		return str;
	}

	private static fromStringWithSeparator(str: string, sep: string): Date | undefined {
		const fields = str.split(sep);
		if (fields.length === 0)
			return undefined;

		const y = parseInt(fields[0]);
		const m = (fields.length >= 2) ? parseInt(fields[1]) : 0;
		const d = (fields.length >= 3) ? parseInt(fields[2]) : 0;
		const t = (fields.length > 4) ? Time.fromIso8601String(fields.slice(3).join(sep)) : new Time();

		// Note - Invalid values for each field will be detected during date construction.
		return new Date(y, m, d, t)
	}
}