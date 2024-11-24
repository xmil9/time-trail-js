export class Hsl {
	private static readonly MaxHue = 360;

	constructor(
		// Hue
		public h: number,
		// Saturation
		public s = 1,
		// Lightness
		public l = 0.5,
		// Alpha
		public a = 1
	) {
		if (h < 0 || h > Hsl.MaxHue)
			throw new Error('HSL hue must be in range [0..360].');
		if (s < 0 || s > 1)
			throw new Error('HSL saturation must be in range [0..1].');
		if (l < 0 || l > 1)
			throw new Error('HSL lightness must be in range [0..1].');
		if (a < 0 || a > 1)
			throw new Error('Alpha value must be in range [0..1].');
	}

	toRgb(): Rgba {
		const normedHue = this.h / Hsl.MaxHue;

		let r, g, b;
		if (this.s === 0) {
			// Achromatic
			r = g = b = this.l;
		} else {
			const q = this.l < 0.5 ? this.l * (1 + this.s) : this.l + this.s - this.l * this.s;
			const p = 2 * this.l - q;
			r = Hsl.hueToRgb(p, q, normedHue + 1 / 3);
			g = Hsl.hueToRgb(p, q, normedHue);
			b = Hsl.hueToRgb(p, q, normedHue - 1 / 3);
		}

		return new Rgba(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), this.a);
	}

	private static hueToRgb(p: number, q: number, t: number) {
		if (t < 0)
			t += 1;
		if (t > 1)
			t -= 1;
		if (t < 1 / 6)
			return p + (q - p) * 6 * t;
		if (t < 1 / 2)
			return q;
		if (t < 2 / 3)
			return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	}

	fromRgb(rgb: Rgba) {
		const r = rgb.r /= 255;
		const g = rgb.g /= 255;
		const b = rgb.b /= 255;

		const vmax = Math.max(r, g, b);
		const vmin = Math.min(r, g, b);
		const l = (vmax + vmin) / 2;

		if (vmax === vmin) {
			// Achromatic
			return new Hsl(0, 0, l, this.a);
		}

		const d = vmax - vmin;
		const s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
		let h = 0;
		if (vmax === r)
			h = (g - b) / d + (g < b ? 6 : 0);
		if (vmax === g)
			h = (b - r) / d + 2;
		if (vmax === b)
			h = (r - g) / d + 4;
		h /= 6;

		return new Hsl(h, s, l, this.a);
	}
}

export class Rgba {

	constructor(
		public r: number,
		public g: number,
		public b: number,
		public a = 1,
	) {
		if (r < 0 || r > 255)
			throw new Error('RGB red must be in range [0..255].');
		if (g < 0 || g > 255)
			throw new Error('RGB green must be in range [0..255].');
		if (b < 0 || b > 255)
			throw new Error('RGB blue must be in range [0..255].');
		if (a < 0 || a > 1)
			throw new Error('Alpha value must be in range [0..1].');
	}

	toString(): string {
		return `rgba(${intNum(this.r)},${intNum(this.g)},${intNum(this.b)},${this.a})`;
	}

	toHex(): string {
		return `#${hexNum(this.r)}${hexNum(this.g)}${hexNum(this.b)}${hexNum(this.a * 255)}`;
	}

}

function intNum(v: number): string {
	return Math.round(v).toString();
}

function hexNum(v: number): string {
	return Math.round(v).toString(16);
}

// Darken color by adding black.
// Factor [0..1], smaller => darker.
export function shade(c: Rgba, factor: number): Rgba {
	return new Rgba(
		c.r * factor,
		c.g * factor,
		c.b * factor,
		c.a
	);
}

// Lighten color by adding white.
// Factor [0..1], larger => lighter.
export function tint(c: Rgba, factor: number): Rgba {
	return new Rgba(
		c.r + (1 - c.r) * factor,
		c.g + (1 - c.g) * factor,
		c.b + (1 - c.b) * factor,
		c.a
	);
}

export function generateRgbaHues(c: Rgba, numHues: number): Array<Rgba> {
	const hues: Rgba[] = [];
    if (numHues <= 0)
        return hues;

    const skipExtremes = 2;
    const inc = 1 / (numHues + 1 + 2 * skipExtremes);
    let factor = (skipExtremes + 1) * inc;

	for (let i = 0; i < numHues; ++i) {
		hues.push(tint(c, factor));
		factor += inc;
	}

    hues.reverse();
    return hues;
}

export function generateHslHues(c: Hsl, numHues: number): Array<Hsl> {
	const hues: Hsl[] = [];
    if (numHues <= 0)
        return hues;

    const darkest = .3;
    const lightest = .9;
    const inc = (lightest - darkest) / (numHues + 1);

    let lightness = lightest;
	for (let i = 0; i < numHues; ++i) {
        hues.push(new Hsl(c.h, c.s, lightness));
        lightness -= inc;
    }

    return hues
}

export function generateColors(numColors: number): Array<Hsl> {
	const colors: Hsl[] = [];
    if (numColors <= 0)
        return colors;

    const fromHue = 0;
    const toHue = 360;
    const inc = (toHue - fromHue) / (numColors + 1);

    let hue = fromHue;
	for (let i = 0; i < numColors; ++i) {
        colors.push(new Hsl(hue, 1, 0.5));
        hue += inc;
    }

    return colors;
}