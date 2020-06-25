import { TestBed } from '@angular/core/testing';

import { CartOrderSummaryService } from './cart-order-summary.service';

describe('CartOrderSummaryService', () => {
  let service: CartOrderSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartOrderSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
