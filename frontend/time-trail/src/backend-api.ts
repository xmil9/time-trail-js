import { makeUrl } from "./app/util";

const Url = 'http://localhost:3000/api';

export enum Endpoint {
	Trails,
	Events
};

const endpointTable = new Map<Endpoint, string>([
	[ Endpoint.Trails, 'trails' ],
	[ Endpoint.Events, 'events' ],
]);

export function getApiUrl(ep: Endpoint): string {
	const path = endpointTable.get(ep);
	if (!path)
		throw new Error(`Endpoint not found: ${ep}`);
	return makeUrl(Url, path);
}