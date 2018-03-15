import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { Measurement } from '../beans/measurement';
import { AuthenticationService } from './authentication.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class MeasurementService {
  static CURRENT_USER_MEASUREMENTS = 'currentUserMeasurements/';
  constructor(private userService: UserService, private http: HttpClient) { }

  public getMeasurementsForCurrentUser(): Observable<Measurement[]> {
    if (!this.userService.isUser()) {
      throw new Error("No user is logged in!");
    }

    return this.http.get<Measurement[]>(AuthenticationService.API_HOST + MeasurementService.CURRENT_USER_MEASUREMENTS);
  }

  public getMeasurementForCurrentUser(measurementId: number): Observable<Measurement> {
    if (!this.userService.isUser()) {
      throw new Error("No user is logged in!");
    }

    return this.http.get<Measurement>(AuthenticationService.API_HOST + MeasurementService.CURRENT_USER_MEASUREMENTS + measurementId);
  }

  public deleteCurrentuUserMeasurement(id: number): Observable<Object> {
    if (!this.userService.isUser()) {
      throw new Error("No user is logged in!");
    }

    return this.http.delete(AuthenticationService.API_HOST + MeasurementService.CURRENT_USER_MEASUREMENTS + id);
  }

  saveCurrentUserMeasurement(measurement: Measurement): Observable<Measurement> {
    if (!this.userService.isUser()) {
      throw new Error("No user is logged in!");
    }

    return this.http.post<Measurement>(AuthenticationService.API_HOST + MeasurementService.CURRENT_USER_MEASUREMENTS, measurement, httpOptions);

  }
}