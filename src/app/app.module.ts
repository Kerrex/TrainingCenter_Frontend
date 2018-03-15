import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { UserService } from './services/user.service';
import { JwtUtils } from './services/jwt-utils.service';
import { AuthenticationService } from './services/authentication.service';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { LogoutComponent } from './components/logout/logout.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { ComponentsModule } from './components/components/components.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { TypographyComponent } from './components/typography/typography.component';
import { IconsComponent } from './components/icons/icons.component';
import { MapsComponent } from './components/maps/maps.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UpgradeComponent } from './components/upgrade/upgrade.component';
import { MeasurementsComponent } from './components/measurements/measurements.component';
import { MeasurementService } from './services/measurement.service';
import { TrainingPlanService } from './services/training-plan.service';
import { MeasurementAddEditComponent } from './components/measurements/addedit/addedit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { ExerciseService } from './services/exercise.service';
import { CommonResourcesService } from './services/common.resources.service';
import { ExerciseAddeditComponent } from './components/exercises/addedit/addedit.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TrainingPlansComponent } from './components/training-plans/training-plans.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/");
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    RegisterComponent,
    MeasurementsComponent,
    MeasurementAddEditComponent,
    ExercisesComponent,
    ExerciseAddeditComponent,
    CalendarComponent,
    TrainingPlansComponent,
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:8080']
      }
    }),
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    //Material design
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTooltipModule,
    MatSelectModule
  ],
  providers: [
    UserService,
    JwtUtils,
    AuthenticationService,
    AuthGuard,
    AdminAuthGuard,
    MeasurementService,
    ExerciseService,
    CommonResourcesService,
    TrainingPlanService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: "pl-PL",
    },
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
