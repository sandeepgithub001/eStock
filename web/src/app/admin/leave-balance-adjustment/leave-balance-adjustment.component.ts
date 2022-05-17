import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConfig } from 'src/Globals/app.config';
import { EmployeeService } from 'src/app/Services/employee.service';
import { CommonService } from 'src/app/Services/common.service';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { SettingsService } from 'src/app/Services/settings.service';

@Component({
  selector: 'app-leave-balance-adjustment',
  templateUrl: './leave-balance-adjustment.component.html',
  styleUrls: ['./leave-balance-adjustment.component.css']
})
export class LeaveBalanceAdjustmentComponent implements OnInit {
  minDate = new Date();
  maxDate = new Date();
  employees: any = [];
  employeeId: number = 0;
  projectManagers = [];
  departments: any = [];
  employeeStatus: any = [];
  leaveModel: FormGroup;
  submitted = false;
  leaveAdjmntObj: any = {};

  constructor(
    private spinner: Ng4LoadingSpinnerService,
    private router: Router,
    private globalService: AppConfig,
    private employeeService: EmployeeService,
    private settingsService: SettingsService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private confirmationDialogService: ConfirmationDialogService
  ) {
  }

  ngOnInit() {
    this.getEmployeeList();
    this.leaveModel = this.formBuilder.group({
      employeeId: ['', Validators.required],
      total: ['', Validators.required],
      immediate: ['', Validators.required],
      type: ['', Validators.required],
      adjustmentDate: ['', Validators.required],
      amount: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.leaveModel.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.leaveModel.invalid) {
      return;
    }

    let content = 'Are you sure you want to submit?';

    this.confirmationDialogService.confirm('Alert', content)
      .then((confirmed) => {
        if (confirmed) {
          this.AddUpdateEmployeeLeaveBalance();
        }
      })
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
      );
  }

  AddUpdateEmployeeLeaveBalance() {
    this.leaveAdjmntObj = this.leaveModel.value;

    this.leaveAdjmntObj.type = this.leaveAdjmntObj.type;
    this.leaveAdjmntObj.notes = this.leaveAdjmntObj.notes;
    this.leaveAdjmntObj.Description = this.leaveAdjmntObj.notes;

    if (this.leaveAdjmntObj.type == "Immediate") {
      this.leaveAdjmntObj.Amount = 0;
      this.leaveAdjmntObj.ImmediateAmount = parseFloat(this.leaveAdjmntObj.amount);
    }
    else {
      this.leaveAdjmntObj.Amount = parseFloat(this.leaveAdjmntObj.amount);
      this.leaveAdjmntObj.ImmediateAmount = 0;
    }
    
    this.leaveAdjmntObj.adjustmentDate = this.datePipe.transform(this.leaveModel.get('adjustmentDate').value, 'yyyy-MM-dd');

    this.spinner.show();
    this.settingsService.UpdateLeaveBalance(this.leaveAdjmntObj).subscribe(
      res => {
        this.submitted = false;
        this.spinner.hide();
        if (res.Status == 200) {
          this.globalService.showNotification(res.Message);
          this.leaveModel.reset();
          this.leaveModel.controls['employeeId'].setValue('');
          this.leaveModel.controls['type'].setValue('');
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
          this.projectManagers = [];
          this.employees = res.Data;
        }
      },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  onChangeEmployee(ev) {
    if (ev.target.value != "") {
      this.spinner.show();
      this.employeeService.GetEmployeeDetailsByID(ev.target.value).subscribe(
        res => {
          this.spinner.hide();
          if (res.Status == 200) {
            let leaveAdjmntObj = res.Data;
            this.leaveModel.patchValue({
              total: leaveAdjmntObj.InitialBalance,
              immediate: leaveAdjmntObj.InitialImidiateBalance,
            });
          }
          else
            this.globalService.showNotification(res.Message);
        },
        error => {
          this.spinner.hide();
          console.log(error);
        });
    }
    else
    {
      this.leaveModel.patchValue({
        total: "",
        immediate: "",
      });
    }
  }

  onCancel() {
    this.submitted = false;
    this.leaveModel.reset();
    this.leaveModel.get('employeeId').setValue('');
    this.leaveModel.get('type').setValue('');
  }
}