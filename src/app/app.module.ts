import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from './shared/shared.module';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {SummaryCardComponent} from './modules/dashboard/summary-card/summary-card.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import { ProvidersReportComponent } from './modules/providers-report/providers-report.component';
import { FacilityRefferalReportComponent } from './modules/providers-report/facility-refferal-report/facility-refferal-report.component';
import { InterFacilityRefferalReportComponent } from './modules/providers-report/inter-facility-refferal-report/inter-facility-refferal-report.component';
import { ProvidersRefferalReportComponent } from './modules/providers-report/providers-refferal-report/providers-refferal-report.component';
import {ReportsComponent} from './modules/reports/reports.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { IndicatorsComponent } from './modules/settings/indicators/indicators.component';
import { ServiceComponent } from './modules/settings/service/service.component';
import { RefferealTypeComponent } from './modules/settings/reffereal-type/reffereal-type.component';
import { RefferealFeedbackComponent } from './modules/settings/reffereal-feedback/reffereal-feedback.component';
import { RegistrationReasonComponent } from './modules/settings/registration-reason/registration-reason.component';
import { CardFilterComponent } from './modules/dashboard/card-filter/card-filter.component';
import { ServiceIndicatorComponent } from './modules/settings/service/service-indicator/service-indicator.component';
import { TotalRegisteredClientsComponent } from './modules/reports/total-registered-clients/total-registered-clients.component';
import { TotalReferralsIssuedComponent } from './modules/reports/total-referrals-issued/total-referrals-issued.component';
import { TotalSuccessfulComponent } from './modules/reports/total-successful/total-successful.component';
import { TotalIssuedLostFollowupComponent } from './modules/reports/total-issued-lost-followup/total-issued-lost-followup.component';
import { TotalLostFollowupComponent } from './modules/reports/total-lost-followup/total-lost-followup.component';
import { TotalFailedReferralsComponent } from './modules/reports/total-failed-referrals/total-failed-referrals.component';
import { SuccessfulMaraliaReferalsComponent } from './modules/reports/successful-maralia-referals/successful-maralia-referals.component';
import { LocationsComponent } from './modules/locations/locations.component';
import {AddLocationComponent} from './modules/locations/add-location/add-location.component';
import { UsersComponent } from './modules/users/users.component';
import { AddMemberComponent } from './modules/users/add-member/add-member.component';
import { TeamInfoComponent } from './modules/users/team-info/team-info.component';
import { AddTeamComponent } from './modules/users/add-team/add-team.component';
import { UpdateMemberComponent } from './modules/users/update-member/update-member.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SummaryCardComponent,
    DashboardComponent,
    ProvidersReportComponent,
    FacilityRefferalReportComponent,
    InterFacilityRefferalReportComponent,
    ProvidersRefferalReportComponent,
    ReportsComponent,
    SettingsComponent,
    IndicatorsComponent,
    ServiceComponent,
    RefferealTypeComponent,
    RefferealFeedbackComponent,
    RegistrationReasonComponent,
    CardFilterComponent,
    ServiceIndicatorComponent,
    TotalRegisteredClientsComponent,
    TotalReferralsIssuedComponent,
    TotalSuccessfulComponent,
    TotalIssuedLostFollowupComponent,
    TotalLostFollowupComponent,
    TotalFailedReferralsComponent,
    SuccessfulMaraliaReferalsComponent,
    LocationsComponent,
    AddLocationComponent,
    UsersComponent,
    AddMemberComponent,
    TeamInfoComponent,
    AddTeamComponent,
    UpdateMemberComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [UpdateMemberComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
