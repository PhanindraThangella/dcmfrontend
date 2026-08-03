import { TestBed } from '@angular/core/testing';

import { PurseRefreshService } from './purse-refresh.service';

describe('PurseRefreshService', () => {
  let service: PurseRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurseRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
