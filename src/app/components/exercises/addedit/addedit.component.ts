import { NotificationUtils } from '../../../utils/notification.utils';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Exercise } from '../../../beans/exercise';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../../services/exercise.service';
import { FormUtils } from '../../../utils/form.utils';

@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css']
})
export class ExerciseAddeditComponent implements OnInit {
  object = Object;
  formGroup: FormGroup;
  isEditing: boolean;
  currentExercise: Exercise;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private exerciseService: ExerciseService, private router: Router) {

  }

  ngOnInit() {
    this.createEmptyFormGroup();
    this.route.params.subscribe(params => {
      let exerciseId = params['id'];
      if (exerciseId !== 'addedit') {
        this.isEditing = true;
        this.exerciseService.getExercise(exerciseId).subscribe(value => {
          this.currentExercise = value;
          this.fillFormGroup(value);
        });
      } else {
        this.currentExercise = new Exercise();
        this.isEditing = false;
      }
    });
  }

  createEmptyFormGroup() {
    this.formGroup = this.formBuilder.group({
      defaultName: new FormControl('', Validators.required),
      youtubeLink: new FormControl('', this.isUrlValidator())
    })
  }

  isUrlValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
      if (!value.startsWith("http://")) {
        return { 'incorrectUrl': "Incorrect URL!" }
      }
      return null;
    }
  }

  fillFormGroup(exercise: Exercise) {
    let formControls = this.formGroup.controls;

    formControls.defaultName.setValue(exercise.defaultName);
    formControls.youtubeLink.setValue(exercise.youtubeLink);
    FormUtils.removeIsEmpty();
  }

  submitExercise() {
    if (!FormUtils.validateFormAndNotify(this.formGroup)) {
      return;
    }

    let controls = this.formGroup.controls;
    this.currentExercise.defaultName = controls.defaultName.value;
    this.currentExercise.youtubeLink = controls.youtubeLink.value;

    this.exerciseService.saveExercise(this.currentExercise).subscribe(_ => {
      this.router.navigateByUrl('/exercises');
      NotificationUtils.showNotification("top", "right", NotificationUtils.SUCCESS, "notifications", "Dodano ćwiczenie!");
    }, error => {
      NotificationUtils.showNotification("top", "right", NotificationUtils.DANGER, "notifications", "Nieoczekiwany błąd serwera!");
    })
  }

}
