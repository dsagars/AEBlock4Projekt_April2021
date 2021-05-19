import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthManagementComponent } from './user-auth-management.component';

describe('UserAuthManagementComponent', () => {
  let component: UserAuthManagementComponent;
  let fixture: ComponentFixture<UserAuthManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAuthManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
