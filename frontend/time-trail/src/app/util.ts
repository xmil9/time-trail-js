export function makeUrl(...pieces: string[]): string {
	if (!pieces.length)
		return '';

	let url = pieces[0];

	for (let i = 1; i < pieces.length; ++i) {
		const piece = pieces[i];
		
		const numSlashes = (url.endsWith('/') ? 1 : 0) + (piece.startsWith('/') ? 1 : 0);
		if (numSlashes == 0)
			url += '/' + piece;
		else if (numSlashes == 1)
			url += piece;
		else
			url += piece.substring(1);
	}

	return url;
}

// Returns random integer [0, max).
export function randomInt(max: number) {
	return Math.floor(Math.random() * max);
}

export function compare(a: number, b: number): number {
	if (a < b)
		return -1;
	if (a === b)
		return 0;
	return 1;
}

export function zeroPad(n: number, maxLen: number): string {
	return n.toFixed().padStart(maxLen, '0');
}
