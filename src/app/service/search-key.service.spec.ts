import { TestBed } from '@angular/core/testing';

import { SearchKeyService } from './search-key.service';

describe('SearchKeyService', () => {
  let service: SearchKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
