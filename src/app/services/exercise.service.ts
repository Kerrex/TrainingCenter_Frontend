import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Exercise } from '../beans/exercise';
import { Page } from '../beans/page';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { ExerciseTrainingPlan } from '../beans/exercise-training-plan';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class ExerciseService {
  static EXERCISES = "exercises/"
  static EXERCISE_TRAINING_PLANS = "exercise_training_plans/";
  constructor(private http: HttpClient, private translateService: TranslateService) { }

  getExercises(): Observable<Page<Exercise>> {
    return this.http.get<Page<Exercise>>(AuthenticationService.API_HOST + ExerciseService.EXERCISES, httpOptions);  
  }

  getExercise(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(AuthenticationService.API_HOST + ExerciseService.EXERCISES + id, httpOptions);
  }

  saveExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(AuthenticationService.API_HOST + ExerciseService.EXERCISES, exercise, httpOptions);
  }

  deleteExercise(exerciseId: number): Observable<Object> {
    return this.http.delete(AuthenticationService.API_HOST + ExerciseService.EXERCISES + exerciseId);
  }

  getCurrentUserExercisesByTrainingPlanId(trainingPlanId: number): Observable<ExerciseTrainingPlan> {
    return this.http.get<ExerciseTrainingPlan>(AuthenticationService.API_HOST + ExerciseService.EXERCISES + "by_training_plan/")
  }
}
