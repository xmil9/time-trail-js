import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { TrailsComponent } from './trails/trails.component';
import { TrailEventsComponent } from './trail-events/trail-events.component';

export const routes: Routes = [
	{path: '', redirectTo: '/map', pathMatch:'full'},
	{path: 'map', component: MapComponent},
	{path: 'trails', component: TrailsComponent},
	{path: 'trail-events/:trailId', component: TrailEventsComponent},
];
