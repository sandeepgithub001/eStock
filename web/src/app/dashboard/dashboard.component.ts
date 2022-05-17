import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConfig } from 'src/Globals/app.config';
import { EmployeeService } from '../Services/employee.service';
import { CommonService } from '../Services/common.service';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogService } from '../components/confirmation-dialog/confirmation-dialog.service';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    currentUser: any;
    minDate = new Date();
    maxDate = new Date();
    leaveDetailsEmployees: any = [];
    TimesheetEmployees: any = [];
    leaveDetailsEmployeeId: string = "";
    TimesheetEmployeeId: string = "";
    monthId: string = "";
    yearId: string = "";
    departments: any = [];
    empObj: any = {};

    constructor(
        private spinner: Ng4LoadingSpinnerService,
        private router: Router,
        private globalService: AppConfig,
        private employeeService: EmployeeService,
        private commonService: CommonService,
        public authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.getEmployeeList();
    }

    AddUpdateEmployee() {

        if (this.empObj.employeeId == 0) {
            this.empObj.type = "I";
        }
        else {
            this.empObj.type = "U";
        }

        this.spinner.show();
        this.employeeService.AddEditEmployee(this.empObj).subscribe(
            res => {
                this.spinner.hide();
                if (res.Status == 200) {
                    this.globalService.showNotification(res.Message);
                    this.router.navigate(['/employees']);
                }
                else
                    this.globalService.showNotification(res.Message);
            },
            error => {
                this.spinner.hide();
                console.log(error);
            });
    }

    getEmployeeList() {
        this.spinner.show();
        this.commonService.GetEmployeeList().subscribe(
            res => {
                this.spinner.hide();
                if (res.Status == 200) {
                    if (this.currentUser.userRoleId != 4) {
                        let empList = res.Data;
                        empList.unshift({
                            "ID": "",
                            "Name": "Select Employee"
                        });
                        this.leaveDetailsEmployees = empList;
                        this.TimesheetEmployees = empList;
                        this.leaveDetailsEmployeeId = this.currentUser.userId.toString();
                        this.TimesheetEmployeeId = this.currentUser.userId.toString();
                    }
                    else {
                        let empList = res.Data.filter(x => x.ID == this.currentUser.userId);
                        this.leaveDetailsEmployees = empList;
                        this.TimesheetEmployees = empList;
                        this.leaveDetailsEmployeeId = this.currentUser.userId.toString();
                        this.TimesheetEmployeeId = this.currentUser.userId.toString();
                    }
                }
            },
            error => {
                this.spinner.hide();
                console.log(error);
            });
    }

    getEmployeeDetails(employeeId) {
        this.spinner.show();
        this.employeeService.GetEmployeeDetailsByID(employeeId).subscribe(
            res => {
                this.spinner.hide();
                if (res.Status == 200) {
                }
            },
            error => {
                this.spinner.hide();
                console.log(error);
            });
    }

    getDepartments() {
        this.commonService.GetDepartments().subscribe(
            res => {
                if (res.Status == 200) {
                    this.departments = res.Data;
                }
            },
            error => {
                console.log(error);
            });
    }
}