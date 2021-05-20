import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferSearchCardComponent } from './offer-search-card.component';

describe('OfferSearchCardComponent', () => {
  let component: OfferSearchCardComponent;
  let fixture: ComponentFixture<OfferSearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferSearchCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
