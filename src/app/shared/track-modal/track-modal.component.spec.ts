import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackModalComponent } from './track-modal.component';

describe('TrackModalComponent', () => {
  let component: TrackModalComponent;
  let fixture: ComponentFixture<TrackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
