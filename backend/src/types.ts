export interface Trail {
	id: number;
    name: string;
}

export interface Event {
	id: number;
    label: string;
	lat: number;
	lng: number;
	start: string;
	end?: string;
	trailId: number;
	order: number;
}

export interface Error {
	error: string;
}
