import sqlite3 from 'sqlite3';

export interface QueryResult {
	rows?: unknown[];
	err?: Error;
}

export class TrailsDb {
	private db: sqlite3.Database;

	constructor(dbPath: string) {
		this.db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
			if (err) {
				console.error('Error opening database', err.message);
			} else {
				console.log('Connected to the SQLite database.');
			}
		});
	}

	async getTrails(): Promise<QueryResult> {
		return new Promise<QueryResult>(resolve => {
			this.db.all(
				'SELECT * FROM trails',
				(err, rows) => resolve({ rows, err: err ?? undefined })
			);
		});
	}

	async getTrail(trailId: string): Promise<QueryResult> {
		return new Promise<QueryResult>(resolve => {
			this.db.all(
				'SELECT * FROM trails WHERE trails.id = ?',
				[trailId],
				(err, rows) => resolve({ rows, err: err ?? undefined })
			);
		});
	}

	async getTrailEvents(trailId: string): Promise<QueryResult> {
		return new Promise<QueryResult>(resolve => {
			this.db.all(
				'SELECT * FROM events WHERE events.trailId = ? ORDER BY `order`',
				[trailId],
				(err, rows) => resolve({ rows, err: err ?? undefined })
			);
		});
	}
}
