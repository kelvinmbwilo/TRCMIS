import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {ProvidersReportComponent} from './modules/providers-report/providers-report.component';
import {InterFacilityRefferalReportComponent} from './modules/providers-report/inter-facility-refferal-report/inter-facility-refferal-report.component';
import {FacilityRefferalReportComponent} from './modules/providers-report/facility-refferal-report/facility-refferal-report.component';
import {ProvidersRefferalReportComponent} from './modules/providers-report/providers-refferal-report/providers-refferal-report.component';
import {ReportsComponent} from './modules/reports/reports.component';
import {SettingsComponent} from './modules/settings/settings.component';
import {ServiceComponent} from './modules/settings/service/service.component';
import {IndicatorsComponent} from './modules/settings/indicators/indicators.component';
import {RefferealFeedbackComponent} from './modules/settings/reffereal-feedback/reffereal-feedback.component';
import {RefferealTypeComponent} from './modules/settings/reffereal-type/reffereal-type.component';
import {RegistrationReasonComponent} from './modules/settings/registration-reason/registration-reason.component';
import {LocationsComponent} from './modules/locations/locations.component';
import {UsersComponent} from './modules/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {state: 'dashboard'}
      },
      {
        path: 'location',
        component: LocationsComponent,
        data: {state: 'location'}
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {state: 'user_management'}
      },
      {
        path: 'reports',
        component: ReportsComponent,
        data: {state: 'reports'}
      },
      {
        path: 'providers_report',
        component: ProvidersReportComponent,
        data: {state: 'providers-report'},
        children: [
          {
            path: 'provide-report',
            component: ProvidersRefferalReportComponent,
            data: {state: 'providers-report'}
          },
          {
            path: 'facility-report',
            component: FacilityRefferalReportComponent,
            data: {state: 'providers-report'}
          },
          {
            path: 'inter-facility-report',
            component: InterFacilityRefferalReportComponent,
            data: {state: 'providers-report'}
          }
        ]
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {state: 'settings'},
        children: [
          {
            path: 'services',
            component: ServiceComponent,
            data: {state: 'services'}
          },
          {
            path: 'indicators',
            component: IndicatorsComponent,
            data: {state: 'indicators'}
          },
          {
            path: 'reffereal-feedback',
            component: RefferealFeedbackComponent,
            data: {state: 'reffereal-feedback'}
          },
          {
            path: 'reffereal-type',
            component: RefferealTypeComponent,
            data: {state: 'reffereal-type'}
          },
          {
            path: 'registration-reason',
            component: RegistrationReasonComponent,
            data: {state: 'registration-reason'}
          }
        ]
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {state: 'login'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
