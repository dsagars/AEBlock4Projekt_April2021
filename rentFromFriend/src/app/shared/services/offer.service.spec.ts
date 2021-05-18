import { TestBed } from '@angular/core/testing';

import { ItemOfferService } from './offer.service';

describe('OfferService', () => {
  let service: ItemOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
