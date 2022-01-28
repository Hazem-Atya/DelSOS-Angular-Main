import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProfileModalComponent } from './modal.component';

describe('StoreProfileModalComponent', () => {
  let component: StoreProfileModalComponent;
  let fixture: ComponentFixture<StoreProfileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreProfileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
