import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import { Error, Trail, Event } from './types';

const port = 3000;
const dbPath = './assets/db/trails.db';

const app = express();
// Disable CORS.
app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		console.error('Error opening database', err.message);
	} else {
		console.log('Connected to the SQLite database.');
	}
});

// Define routes
app.get('/api/trails', (req: Request, res: Response<Trail[] | Error>) => {
	db.all('SELECT * FROM trails', (err, result: any) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json(result);
	});
});

app.get('/api/events', (req: Request, res: Response<Event[] | Error>) => {
	db.all(`SELECT * FROM events`, (err, result: any) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json(result);
	});
});

app.get('/api/trail/:trailId', (req: Request, res: Response<Event[] | Error>) => {
	db.all(`SELECT * FROM trails JOIN events ON trails.id = events.trailId WHERE trails.id = ? ORDER BY 'order'`,
		[req.params.trailId],
		(err, result: any) => {
			if (err) {
				res.status(500).json({ error: err.message });
				return;
			}
			res.json(result);
		});
});

// Start server
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
