import { TestBed } from '@angular/core/testing';

import { EmpRegisterServiceService } from './emp-register-service.service';

describe('EmpRegisterServiceService', () => {
  let service: EmpRegisterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpRegisterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
