import { TrailId } from "./app/trail-types";
import { makeUrl } from "./app/util";

const ApiUrl = 'http://localhost:3000/api';

enum Endpoint {
	Trails,
	Events
};

const endpointTable = new Map<Endpoint, string>([
	[ Endpoint.Trails, 'trails' ],
	[ Endpoint.Events, 'events' ],
]);

function getEndpointUrl(ep: Endpoint): string {
	const path = endpointTable.get(ep);
	if (!path)
		throw new Error(`Endpoint not found: ${ep}`);
	return makeUrl(ApiUrl, path);
}

///////////////////

export function makeUrlToGetTrails(): string {
	return getEndpointUrl(Endpoint.Trails);
}

export function makeUrlToGetTrail(trailId: TrailId): string {
	return makeUrl(getEndpointUrl(Endpoint.Trails), `${trailId}`);
}

export function makeUrlToGetTrailEvents(trailId: TrailId): string {
	return makeUrl(getEndpointUrl(Endpoint.Events), `${trailId}`);
}