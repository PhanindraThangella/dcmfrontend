import { TestBed } from '@angular/core/testing';

import { TagRelatedServiceService } from './tag-related-service.service';

describe('TagRelatedServiceService', () => {
  let service: TagRelatedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagRelatedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
