import { TestBed } from '@angular/core/testing';

import { MapifyService } from './mapify.service';

describe('MapifyService', () => {
  let service: MapifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
