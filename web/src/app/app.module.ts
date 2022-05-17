import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppComponent } from './app.component';
import { MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { ModalModule, TimepickerModule, BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthGuard } from './AuthGuard/auth.guard';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { LoginComponent } from './Login/login.component';
import { environment } from 'src/environments/environment';
import { LayoutComponent } from './Shared/_layout/layout.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { EmployeesComponent } from './common/employees/employees.component';
import { LeavesComponent } from './common/leaves/leaves.component';
import { LeavesLedgerComponent } from './common/leaves-ledger/leaves-ledger.component';
import { BioMetricComponent } from './admin/bio-metric/bio-metric.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { ConfirmationComponent } from './common/confirmation/confirmation.component';
import { LogsComponent } from './common/logs/logs.component';
import { ReportsComponent } from './common/reports/reports.component';
import { ApplyLeavesComponent } from './components/apply-leaves/apply-leaves.component';
import { ViewLeavesComponent } from './components/view-leaves/view-leaves.component';
import { PendingApprovedLeavesComponent } from './components/pending-approved-leaves/pending-approved-leaves.component';
import { PublicHolidayComponent } from './components/public-holiday/public-holiday.component';
import { AutotakenTakenRejectedCancelledLeavesComponent } from './components/autotaken-taken-rejected-cancelled-leaves/autotaken-taken-rejected-cancelled-leaves.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './components/confirmation-dialog/confirmation-dialog.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AddEditEmployeeComponent } from './admin/add-edit-employee/add-edit-employee.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { PublicHolidaysSettingsComponent } from './admin/public-holidays-settings/public-holidays-settings.component';
import { LeaveBalanceAdjustmentComponent } from './admin/leave-balance-adjustment/leave-balance-adjustment.component';
import { MonthlyLeaveFactorComponent } from './admin/monthly-leave-factor/monthly-leave-factor.component';
import { LoyaltyLeaveFactorComponent } from './admin/loyalty-leave-factor/loyalty-leave-factor.component';
import { JoiningLeaveFactorComponent } from './admin/joining-leave-factor/joining-leave-factor.component';
import { PlannedLeaveSettingsComponent } from './admin/planned-leave-settings/planned-leave-settings.component';
import { UnplannedLeaveSettingsComponent } from './admin/unplanned-leave-settings/unplanned-leave-settings.component';
import { TwoDigitDecimaNumberDirective } from './validators/two-digit-decima-number.directive';
import { DateOnlyDirective } from './validators/date.directive';
import { MobileNumberDirective } from './validators/mobile-number.directive';
import { SummaryReportComponent } from './components/summary-report/summary-report.component';
import { LopReportComponent } from './components/lop-report/lop-report.component';
import { PendingComponent } from './components/pending/pending.component';
import { ApprovedComponent } from './components/approved/approved.component';
import { TakenComponent } from './components/taken/taken.component';
import { EventsComponent } from './common/events/events.component';
import { CurrentEventComponent } from './components/current-event/current-event.component';
import { PastEventComponent } from './components/past-event/past-event.component';
import { DigitNumberOnlyDirective } from './validators/digit-number-only.directive';
import { NotAllowOnlySpaceDirective } from './validators/char-only.directive';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxMaskModule } from 'ngx-mask';
import { Select2Module } from 'ng2-select2';



let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.GoogleOAuthClientId)
  },
]);

export function provideConfig() {
  return config;
}

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(),
    { containerClass: "theme-dark-blue" },
    { dateInputFormat: 'DD-MM-YYYY' },
    { adaptivePosition: true },
    { isAnimated: true }
  );
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    EmployeesComponent,
    LeavesComponent,
    LeavesLedgerComponent,
    ConfirmationComponent,
    LogsComponent,
    ReportsComponent,
    BioMetricComponent,
    SettingsComponent,
    ApplyLeavesComponent,
    ViewLeavesComponent,
    PendingApprovedLeavesComponent,
    PublicHolidayComponent,
    AutotakenTakenRejectedCancelledLeavesComponent,
    ConfirmationDialogComponent,
    AddEditEmployeeComponent,
    PublicHolidaysSettingsComponent,
    LeaveBalanceAdjustmentComponent,
    MonthlyLeaveFactorComponent,
    LoyaltyLeaveFactorComponent,
    JoiningLeaveFactorComponent,
    PlannedLeaveSettingsComponent,
    UnplannedLeaveSettingsComponent,
    TwoDigitDecimaNumberDirective,
    DigitNumberOnlyDirective,
    NotAllowOnlySpaceDirective,
    MobileNumberDirective,
    DateOnlyDirective,
    SummaryReportComponent,
    LopReportComponent,
    PendingComponent,
    ApprovedComponent,
    TakenComponent,
    EventsComponent,
    CurrentEventComponent,
    PastEventComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatAutocompleteModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    NgxPermissionsModule.forRoot(),
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    TabsModule.forRoot(),
    AngularMultiSelectModule,
    Select2Module,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NgbModule,
    // NgbModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SocialLoginModule,
    InfiniteScrollModule,
    AutocompleteLibModule,
    NgxPageScrollModule,
    NgxMaskModule.forRoot({
      validation: true,
    }),
  ],
  providers: [
    DatePipe,
    AuthGuard,
    Title,
    ConfirmationDialogService,
    Ng4LoadingSpinnerService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: BsDatepickerConfig,
      useFactory: getDatepickerConfig
    }],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
