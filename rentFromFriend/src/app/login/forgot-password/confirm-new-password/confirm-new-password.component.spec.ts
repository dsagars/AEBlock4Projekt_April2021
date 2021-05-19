import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmNewPasswordComponent } from './confirm-new-password.component';

describe('ConfirmNewPasswordComponent', () => {
  let component: ConfirmNewPasswordComponent;
  let fixture: ComponentFixture<ConfirmNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmNewPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
