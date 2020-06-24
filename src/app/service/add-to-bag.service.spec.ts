import { TestBed } from '@angular/core/testing';

import { AddToBagService } from './add-to-bag.service';

describe('AddToBagService', () => {
  let service: AddToBagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToBagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
