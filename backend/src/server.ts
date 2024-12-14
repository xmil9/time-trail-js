import express, { Request, Response } from 'express';
import cors from 'cors';
import { Error, Trail, Event } from './types.js';
import { QueryResult, TrailsDb } from './trails-db.js';

const port = 3000;
const dbPath = './assets/db/trails.db';

const app = express();
// Disable CORS.
app.use(cors());

const db = new TrailsDb(dbPath);

// Define routes
app.get('/api/trails/:trailId?', async (req: Request, resp: Response<Trail[] | Error>) => {
	let result: QueryResult = {};

	const trailId = req.params.trailId;
	if (trailId) {
		result = await db.getTrail(trailId);
	} else {
		result = await db.getTrails();
	}

	fillResponse(result, resp);
});

app.get('/api/events/:trailId', async (req: Request, resp: Response<Event[] | Error>) => {
	const trailId = req.params.trailId;
	const result = await db.getTrailEvents(trailId);
	fillResponse(result, resp);
});

// Start server
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

function fillResponse(result: QueryResult, resp: Response<any>) {
	if (result.err) {
		resp.status(500).json({ error: result.err.message });
	} else {
		resp.json(result.rows);
	}
}