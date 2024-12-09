import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailEventsComponent } from './trail-events.component';

describe('TrailEventsComponent', () => {
  let component: TrailEventsComponent;
  let fixture: ComponentFixture<TrailEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
