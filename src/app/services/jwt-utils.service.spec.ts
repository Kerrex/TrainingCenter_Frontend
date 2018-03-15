import { TestBed, inject } from '@angular/core/testing';

import { JwtUtils } from './jwt-utils.service';

describe('JwtUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtUtils]
    });
  });

  it('should be created', inject([JwtUtils], (service: JwtUtils) => {
    expect(service).toBeTruthy();
  }));
});
