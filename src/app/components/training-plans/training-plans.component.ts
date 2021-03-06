import {NotificationUtils} from '../../utils/notification.utils';
import {CommonResourcesService} from '../../services/common.resources.service';
import {TranslateService} from '@ngx-translate/core';
import {Exercise} from '../../beans/exercise';
import {Page} from '../../beans/page';
import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'
import { TrainingPlan } from '../../beans/training-plan';
import { TrainingPlanService } from '../../services/training-plan.service';
import { Resource } from '../../beans/resource';
import { ExerciseTrainingPlan } from '../../beans/exercise-training-plan';

declare var $: any;

@Component({
  selector: 'app-training-plans',
  templateUrl: './training-plans.component.html',
  styleUrls: ['./training-plans.component.css']
})
export class TrainingPlansComponent implements OnInit {
  trainingPlans: Observable<Page<TrainingPlan>>;
  exercises: Observable<Page<Exercise>>;
  selectedTrainingPlan: TrainingPlan
  exerciseAndExercisePlan: {
    exercise: Exercise,
    exercisePlan: ExerciseTrainingPlan
  }

  constructor(private trainingPlanService: TrainingPlanService, private resourceService: CommonResourcesService,
              private translateService: TranslateService, private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.trainingPlans = this.trainingPlanService.getTrainingPlans();
  }

  deleteTrainingPlan(trainingPlan: TrainingPlan) {
    if (!confirm('Usunąć ten plan treningowy?')) {
      return;
    }

    this.trainingPlanService.deleteTrainingPlan(trainingPlan.id).subscribe(
      (_) => {
        $(`#training_plan_${trainingPlan.id}`).remove();
        NotificationUtils.showNotification('top', 'right', NotificationUtils.SUCCESS, 'notifications', 'Pomyślnie usunięto!');
      },
      (error => NotificationUtils.showNotification('top', 'right', NotificationUtils.DANGER, 'notifications', 'Nieznany błąd serwera!')));
  }

  getResources(page: Page<TrainingPlan | Exercise>): (TrainingPlan | Exercise)[] {
    return this.resourceService.getResources(page);
  }

  goToPreviousPage(page: Page<TrainingPlan>) {
    if (page._links.prev !== undefined) {
      let previousPageUrl = page._links.prev.href;
      this.trainingPlans = this.resourceService.getArrayFromUrl<TrainingPlan>(previousPageUrl);
    }
  }

  goToNextPage(page: Page<Exercise>) {
    if (page._links.next !== undefined) {
      let nextPageUrl = page._links.next.href;
      this.trainingPlans = this.resourceService.getArrayFromUrl<TrainingPlan>(nextPageUrl);
    }
  }

  selectTrainingPlan($event: any, trainingPlan: TrainingPlan) {
    $(".training_plan_row").removeClass('selected');
    $($event.target).addClass('selected');

    this.selectedTrainingPlan = trainingPlan;
    this.exercises = this.exerciseService.getCurrentUserExercisesByTrainingPlanId(trainingPlan.id);
    const dupa = this.exercises.map(exercisePage => this.getResources(exercisePage))
                               .flatMap(exercises => Observable.forkJoin(exercises.map(exercise => this.exerciseService.getExerciseTrainingPlan(trainingPlan.id, exercise.id)))
                            
                                                   
  }

  getExerciseName(exercise: Exercise): string {
    let currentLang = this.translateService.currentLang;
    let translatedExercise = exercise.exerciseLanguageVersions.find(lv => lv.languageVersionCode === currentLang);
    if (translatedExercise !== undefined) {
      return translatedExercise.name;
    }
    return exercise.defaultName;
  }

  getExercisePlan(exerciseId: number): Observable<ExerciseTrainingPlan> {
    return this.exerciseService.getExerciseTrainingPlan(this.selectedTrainingPlan.id, exerciseId);
  }

  print(obj: Object) {
    console.log(obj);
  }
}
