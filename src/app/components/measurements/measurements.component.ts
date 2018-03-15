import { Component, OnInit } from '@angular/core';
import { Measurement } from '../../beans/measurement';
import { MeasurementService } from '../../services/measurement.service';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { NotificationUtils } from '../../utils/notification.utils';
import { catchError } from 'rxjs/operators/catchError';
import { User } from '../../beans/user';
import { UserService } from '../../services/user.service';
import { FatUtils } from '../../utils/fat.utils';
declare var $: any;

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.css']
})
export class MeasurementsComponent implements OnInit {
  measurements: Observable<Measurement[]>;
  measurementIdToFatMap: { [key:number] : string } = {};
  constructor(private measurementService: MeasurementService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUserData().subscribe(user => {
      this.measurements = this.measurementService.getMeasurementsForCurrentUser().map(measurements => {
        measurements.forEach(measurement => {
          if (user.userData.gender === 0) {
            this.measurementIdToFatMap[measurement.id] = FatUtils.calculateWomanFat(user.userData.height, measurement.waist / 10, measurement.neck / 10, measurement.hips / 10);
          } else if (user.userData.gender === 1) {
            this.measurementIdToFatMap[measurement.id] = FatUtils.calculateManFat(user.userData.height, measurement.waist / 10, measurement.neck / 10);
          }
        })
        return measurements;
      })
    })
  }

  deleteMeasurement(measurement: Measurement) {
    if (!alert('Usunąć ten pomiar?')) {
      return;
    }

    this.measurementService.deleteCurrentuUserMeasurement(measurement.id).subscribe(
      (_) => {
        $(`#measurement_${measurement.id}`).remove();
        NotificationUtils.showNotification('top', 'right', NotificationUtils.SUCCESS, 'notifications', 'Successfully erased!');
      },
      (error => NotificationUtils.showNotification('top', 'right', NotificationUtils.DANGER, 'notifications', 'Error when erasing!')));
  }

  getFatPercentage(measurement: Measurement): string {
    return this.measurementIdToFatMap[measurement.id];
  }
  
}
