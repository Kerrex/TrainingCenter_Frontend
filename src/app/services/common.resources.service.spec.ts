import { TestBed, inject } from '@angular/core/testing';

import { CommonResourcesService } from './common.resources.service';

describe('Common.ResourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonResourcesService]
    });
  });

  it('should be created', inject([CommonResourcesService], (service: CommonResourcesService) => {
    expect(service).toBeTruthy();
  }));
});
