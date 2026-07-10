import { TestBed } from '@angular/core/testing';

import { CurrentPurseService } from './current-purse.service';

describe('CurrentPurseService', () => {
  let service: CurrentPurseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentPurseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
