import {AuthenticationService} from './authentication.service';
import {Page} from '../beans/page';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TrainingPlan } from '../beans/training-plan';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class TrainingPlanService {

  static TRAINING_PLANS = "training_plans/"
  constructor(private http: HttpClient, private translateService: TranslateService) { }

  getTrainingPlans(): Observable<Page<TrainingPlan>> {
    return this.http.get<Page<TrainingPlan>>(AuthenticationService.API_HOST + TrainingPlanService.TRAINING_PLANS, httpOptions);  
  }

  getTrainingPlan(id: number): Observable<TrainingPlan> {
    return this.http.get<TrainingPlan>(AuthenticationService.API_HOST + TrainingPlanService.TRAINING_PLANS + id, httpOptions);
  }

  saveTrainingPlan(trainingPlan: TrainingPlan): Observable<TrainingPlan> {
    return this.http.post<TrainingPlan>(AuthenticationService.API_HOST + TrainingPlanService.TRAINING_PLANS, trainingPlan, httpOptions);
  }

  deleteTrainingPlan(trainingPlanId: number): Observable<Object> {
    return this.http.delete(AuthenticationService.API_HOST + TrainingPlanService.TRAINING_PLANS + trainingPlanId);
  }

}
