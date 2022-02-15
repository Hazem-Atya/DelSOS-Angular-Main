import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesCatalogComponent } from './deliveries-catalog.component';

describe('DeliveriesCatalogComponent', () => {
  let component: DeliveriesCatalogComponent;
  let fixture: ComponentFixture<DeliveriesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveriesCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
