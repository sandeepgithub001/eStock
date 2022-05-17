import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { LeavesLedgerComponent } from './common/leaves-ledger/leaves-ledger.component';
import { LayoutComponent } from './Shared/_layout/layout.component';
import { AuthGuard } from './AuthGuard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './common/employees/employees.component';
import { LeavesComponent } from './common/leaves/leaves.component';
import { ConfirmationComponent } from './common/confirmation/confirmation.component';
import { LogsComponent } from './common/logs/logs.component';
import { ReportsComponent } from './common/reports/reports.component';
import { BioMetricComponent } from './admin/bio-metric/bio-metric.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { AddEditEmployeeComponent } from './admin/add-edit-employee/add-edit-employee.component';
import { PublicHolidaysSettingsComponent } from './admin/public-holidays-settings/public-holidays-settings.component';
import { LeaveBalanceAdjustmentComponent } from './admin/leave-balance-adjustment/leave-balance-adjustment.component';
import { MonthlyLeaveFactorComponent } from './admin/monthly-leave-factor/monthly-leave-factor.component';
import { JoiningLeaveFactorComponent } from './admin/joining-leave-factor/joining-leave-factor.component';
import { LoyaltyLeaveFactorComponent } from './admin/loyalty-leave-factor/loyalty-leave-factor.component';
import { PlannedLeaveSettingsComponent } from './admin/planned-leave-settings/planned-leave-settings.component';
import { UnplannedLeaveSettingsComponent } from './admin/unplanned-leave-settings/unplanned-leave-settings.component';
import { EventsComponent } from './common/events/events.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' }, canActivate: [AuthGuard] },
      { path: 'events', component: EventsComponent, data: { title: 'Events' }, canActivate: [AuthGuard] },

      { path: 'employees', component: EmployeesComponent, data: { title: 'Employee' }, canActivate: [AuthGuard] },
      { path: 'employees/add-employee/:id', component: AddEditEmployeeComponent, data: { title: 'Add Employee' }, canActivate: [AuthGuard] },
      { path: 'employees/update-employee/:id', component: AddEditEmployeeComponent, data: { title: 'Update Employee' }, canActivate: [AuthGuard] },

      { path: 'leaves', component: LeavesComponent, data: { title: 'Leave' }, canActivate: [AuthGuard] },
      { path: 'leaves/leaves-ledger', component: LeavesLedgerComponent, data: { title: 'Leave Ledger' }, canActivate: [AuthGuard] },
      { path: 'leaves/confirmation', component: ConfirmationComponent, data: { title: 'Confirmation' }, canActivate: [AuthGuard] },
      { path: 'leaves/logs', component: LogsComponent, data: { title: 'Logs' }, canActivate: [AuthGuard] },
      { path: 'leaves/reports', component: ReportsComponent, data: { title: 'Reports' }, canActivate: [AuthGuard] },

      { path: 'settings/monthly-leave-factor', component: MonthlyLeaveFactorComponent, data: { title: 'Monthly Leave Factor' }, canActivate: [AuthGuard] },
      { path: 'settings/loyalty-leave-factor', component: LoyaltyLeaveFactorComponent, data: { title: 'Loyalty Leave Factor' }, canActivate: [AuthGuard] },
      { path: 'settings/joining-leave-factor', component: JoiningLeaveFactorComponent, data: { title: 'Joining Leave Factor' }, canActivate: [AuthGuard] },
      { path: 'settings/planned-leave-settings', component: PlannedLeaveSettingsComponent, data: { title: 'Planned Leave Settings' }, canActivate: [AuthGuard] },
      { path: 'settings/unplanned-leave-settings', component: UnplannedLeaveSettingsComponent, data: { title: 'Unplanned Leave Settings' }, canActivate: [AuthGuard] },
      { path: 'settings/public-holidays-settings', component: PublicHolidaysSettingsComponent, data: { title: 'Public Holidays Settings' }, canActivate: [AuthGuard] },
      { path: 'settings/leave-balance-adjustment', component: LeaveBalanceAdjustmentComponent, data: { title: 'Leave Balance Adjustment' }, canActivate: [AuthGuard] },

      { path: 'bio-metric', component: BioMetricComponent, data: { title: 'Bio-Metric' }, canActivate: [AuthGuard] },
      { path: 'settings', component: SettingsComponent, data: { title: 'Settings' }, canActivate: [AuthGuard] },
    ]
  },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
