import { TestBed } from '@angular/core/testing';

import { OrdersRefreshServiceService } from './orders-refresh-service.service';

describe('OrdersRefreshServiceService', () => {
  let service: OrdersRefreshServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersRefreshServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
