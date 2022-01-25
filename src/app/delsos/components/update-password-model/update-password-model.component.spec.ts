import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordModelComponent } from './update-password-model.component';

describe('UpdatePasswordModelComponent', () => {
  let component: UpdatePasswordModelComponent;
  let fixture: ComponentFixture<UpdatePasswordModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePasswordModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
