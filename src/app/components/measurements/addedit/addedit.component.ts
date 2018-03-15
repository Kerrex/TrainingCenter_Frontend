import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MeasurementService } from '../../../services/measurement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Measurement } from '../../../beans/measurement';
import { DatePipe } from '@angular/common/';
import { NotificationUtils } from '../../../utils/notification.utils';
import { FormUtils } from '../../../utils/form.utils';
declare var $: any;

@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css'],
  providers: [DatePipe]
})
export class MeasurementAddEditComponent implements OnInit {
  formGroup: FormGroup
  isEditing: boolean
  currentMeasurement: Measurement
  constructor(private formBuilder: FormBuilder, private measurementService: MeasurementService, private route: ActivatedRoute,
              private datePipe: DatePipe, private router: Router) { }

  ngOnInit() {
    this.createEmptyFormGroup();
    this.route.params.subscribe(params => {
      let measurementIdStr = params['id'];
      if (measurementIdStr !== 'addedit') {
        this.isEditing = true;
        let measurementId = +measurementIdStr;
        this.measurementService.getMeasurementForCurrentUser(measurementId).subscribe(value => {
          this.currentMeasurement = value;
          this.fillFormGroup(value);
        })
      } else {
        this.currentMeasurement = new Measurement();
        this.isEditing = false;
      }
    });
  }

  ngAfterViewInit() {
    $(".disabled").attr("disabled", true);
  }

  fillFormGroup(measurement: Measurement) {
    let formatedDate = this.datePipe.transform(measurement.dateAdded, 'dd.MM.yyyy');
    let formControls = this.formGroup.controls;
    // console.log(measurement.dateAdded.getDate());
    //$("#mat-input-0").val(formatedDate);
    formControls.date.setValue(new Date(measurement.dateAdded));
    // formControls.date.
    formControls.waist.setValue(measurement.waist / 10);
    formControls.weight.setValue(measurement.weight / 10);
    formControls.biceps.setValue(measurement.biceps / 10);
    formControls.thigh.setValue(measurement.thigh / 10);
    formControls.chest.setValue(measurement.chest / 10);
    formControls.hips.setValue(measurement.hips / 10);
    formControls.neck.setValue(measurement.neck / 10);
    this.removeIsEmpty();
  }

  createEmptyFormGroup() {
    this.formGroup = this.formBuilder.group({
      date: new FormControl('', Validators.required),
      waist: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      biceps: new FormControl('', Validators.required),
      thigh: new FormControl(''),
      chest: new FormControl(''),
      hips: new FormControl(''),
      neck: new FormControl('', Validators.required),
    })
  }

  private removeIsEmpty() {
    FormUtils.removeIsEmpty()
  }

  submitMeasurement() {
    if (!FormUtils.validateFormAndNotify(this.formGroup)) {
      return;
    }
    
    let controls = this.formGroup.controls;
    this.currentMeasurement.dateAdded = new Date(this.formGroup.controls.date.value).getTime();
    this.currentMeasurement.waist = controls.waist.value * 10;
    this.currentMeasurement.weight = controls.weight.value * 10;
    this.currentMeasurement.biceps = controls.biceps.value * 10;
    this.currentMeasurement.thigh = controls.thigh.value * 10;
    this.currentMeasurement.chest = controls.chest.value * 10;
    this.currentMeasurement.hips = controls.hips.value * 10;
    this.currentMeasurement.neck = controls.neck.value * 10;

    this.measurementService.saveCurrentUserMeasurement(this.currentMeasurement).subscribe(_ => {
      this.router.navigateByUrl('/measurements');
      NotificationUtils.showNotification("top", "right", NotificationUtils.SUCCESS, "notifications", "Dodano pomiar");
    },
    error => {
      NotificationUtils.showNotification("top", "right", NotificationUtils.DANGER, "notifications", "Nie udało się dodać pomiaru!");
    });
    
  }
 
}
