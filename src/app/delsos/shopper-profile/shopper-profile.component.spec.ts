import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopperProfileComponent } from './shopper-profile.component';

describe('ShopperProfileComponent', () => {
  let component: ShopperProfileComponent;
  let fixture: ComponentFixture<ShopperProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopperProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopperProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
