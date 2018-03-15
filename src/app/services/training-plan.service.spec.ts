import { TestBed, inject } from '@angular/core/testing';

import { TrainingPlanService } from './training-plan.service';

describe('TrainingPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingPlanService]
    });
  });

  it('should be created', inject([TrainingPlanService], (service: TrainingPlanService) => {
    expect(service).toBeTruthy();
  }));
});
