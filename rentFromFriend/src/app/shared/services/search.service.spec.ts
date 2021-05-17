import { TestBed } from '@angular/core/testing';

import { ItemSearchService } from './search.service';

describe('SearchService', () => {
  let service: ItemSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
