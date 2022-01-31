import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCardShopperComponent } from './delivery-card-shopper.component';

describe('DeliveryCardShopperComponent', () => {
  let component: DeliveryCardShopperComponent;
  let fixture: ComponentFixture<DeliveryCardShopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCardShopperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryCardShopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
