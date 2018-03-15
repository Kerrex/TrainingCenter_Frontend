import { Component, OnInit } from '@angular/core';
import { Exercise } from '../../beans/exercise';
import { Observable } from 'rxjs/Observable';
import { ExerciseService } from '../../services/exercise.service';
import { CommonResourcesService } from '../../services/common.resources.service';
import { Page } from '../../beans/page';
import { TranslateService } from '@ngx-translate/core';
import { NotificationUtils } from '../../utils/notification.utils';
declare const $: any;

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {
  exercises: Observable<Page<Exercise>>;

  constructor(private exerciseService: ExerciseService, private resourceService: CommonResourcesService,
              private translateService: TranslateService) { }

  ngOnInit() {
    this.exercises = this.exerciseService.getExercises();
  }

  getExerciseName(exercise: Exercise): string {
    let currentLang = this.translateService.currentLang;
    let translatedExercise = exercise.exerciseLanguageVersions.find(lv => lv.languageVersionCode === currentLang);
    if (translatedExercise !== undefined) {
      return translatedExercise.name;
    }
    return exercise.defaultName;
  }

  deleteExercise(exercise: Exercise) {
    if (!confirm('Usunąć to ćwiczenie?')) {
      return;
    }

    this.exerciseService.deleteExercise(exercise.id).subscribe(
      (_) => {
        $(`#exercise_${exercise.id}`).remove();
        NotificationUtils.showNotification('top', 'right', NotificationUtils.SUCCESS, 'notifications', 'Pomyślnie usunięto!');
      },
      (error => NotificationUtils.showNotification('top', 'right', NotificationUtils.DANGER, 'notifications', 'Nieznany błąd serwera!')));
  }

  getResources(page: Page<Exercise>): Exercise[] {
    return this.resourceService.getResources(page);
  }

  goToPreviousPage(page: Page<Exercise>) {
    if (page._links.prev !== undefined) {
      let previousPageUrl = page._links.prev.href;
      this.exercises = this.resourceService.getArrayFromUrl<Exercise>(previousPageUrl);
    }
  }

  goToNextPage(page: Page<Exercise>) {
    if (page._links.next !== undefined) {
      let nextPageUrl = page._links.next.href;
      this.exercises = this.resourceService.getArrayFromUrl<Exercise>(nextPageUrl);
    }
  }

}
