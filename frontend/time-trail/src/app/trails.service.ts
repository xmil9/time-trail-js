import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trail } from './trail-types';
import { makeUrl } from './util';

@Injectable({
  providedIn: 'root'
})
export class TrailsService {
	private readonly apiUrl = 'http://localhost:3000/api';

	constructor(private http: HttpClient) { }

	getTrails(): Observable<Trail[]> {
		return this.http.get<Trail[]>(makeUrl(this.apiUrl, 'trails'));
	}
}
