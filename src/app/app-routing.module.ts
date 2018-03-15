import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { TypographyComponent } from './components/typography/typography.component';
import { IconsComponent } from './components/icons/icons.component';
import { MapsComponent } from './components/maps/maps.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UpgradeComponent } from './components/upgrade/upgrade.component';
import { MeasurementsComponent } from './components/measurements/measurements.component';
import { MeasurementAddEditComponent } from './components/measurements/addedit/addedit.component';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { ExerciseAddeditComponent } from './components/exercises/addedit/addedit.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TrainingPlansComponent } from './components/training-plans/training-plans.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'measurements',
    component: MeasurementsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'measurements/:id',
    component: MeasurementAddEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'exercises',
    component: ExercisesComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'exercises/:id',
    component: ExerciseAddeditComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard]
  },
  { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'user-profile',   component: UserProfileComponent },
  { path: 'table-list',     component: TableListComponent },
  { path: 'typography',     component: TypographyComponent },
  { path: 'icons',          component: IconsComponent },
  { path: 'maps',           component: MapsComponent },
  { path: 'notifications',  component: NotificationsComponent },
  { path: 'upgrade',        component: UpgradeComponent },
  { path: 'training-plans', component: TrainingPlansComponent },
  { path: '',               redirectTo: 'home', pathMatch: 'full' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
