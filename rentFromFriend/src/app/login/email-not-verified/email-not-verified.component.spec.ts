import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNotVerifiedComponent } from './email-not-verified.component';

describe('EmailNotVerifiedComponent', () => {
  let component: EmailNotVerifiedComponent;
  let fixture: ComponentFixture<EmailNotVerifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailNotVerifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailNotVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
