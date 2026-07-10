import { TestBed } from '@angular/core/testing';

import { ManagerServicesService } from './manager-services.service';

describe('ManagerServicesService', () => {
  let service: ManagerServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
