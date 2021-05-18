import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsMissingComponent } from './user-details-missing.component';

describe('UserDetailsMissingComponent', () => {
  let component: UserDetailsMissingComponent;
  let fixture: ComponentFixture<UserDetailsMissingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsMissingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsMissingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
