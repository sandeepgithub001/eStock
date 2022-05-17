import { Component, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppConfig } from 'src/Globals/app.config';
import { CommonService } from 'src/app/Services/common.service';
import { DatePipe } from '@angular/common';
import { LeavesService } from 'src/app/Services/leaves.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ImageService } from 'src/app/Services/image.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';


@Component({
  selector: 'app-apply-leaves',
  templateUrl: './apply-leaves.component.html',
  styleUrls: ['./apply-leaves.component.css']
})
export class ApplyLeavesComponent implements OnInit {
  currentUser: any;
  minDate = null;
  maxDate = null;
  minFromTime = null;
  minToTime = null;
  bsConfig: any;
  minToDate = new Date();
  employees: any = [];
  projectManagers = [];
  leaveTypes: any = [];
  employeeStatus: any = [];
  leaveModel: FormGroup;
  submitted = false;
  leaveObj: any = {};
  progress: number = 0;
  attachmentObj: any = null;
  tempAttachments: any = [];
  attachments: any = [];
  employeeId: number = 0;
  modalRef: BsModalRef | null;
  confirmationObj: any = {};
  IsDescriptionLimitExceeded: boolean = false;

  constructor(
    private spinner: Ng4LoadingSpinnerService,
    private globalService: AppConfig,
    private leavesService: LeavesService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private el: ElementRef,
    private imageService: ImageService,
    public authenticationService: AuthenticationService,
    private modalService: BsModalService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {

    this.employeeId = this.currentUser.userId;
   
    this.getRoleWiseEmployeeList();
    this.getEmployeeWiseLeaveTypes(this.employeeId);

    let currentDate = new Date();
    this.leaveModel = this.formBuilder.group({
      employeeId: ['', Validators.required],
      leaveTypeId: ['', Validators.required],
      fromDate: [currentDate, [Validators.required]],
      toDate: [currentDate, [Validators.required]],
      expectedDeliveryDate: [''],
      fromTime: [''],
      toTime: [''],
      duration: ['0', [Validators.required]],
      description: ['', Validators.required],
      photoAttachment: [''],
      dayType: ['0.5'],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.leaveModel.controls; }

  onSubmit(template: TemplateRef<any>) {
    this.submitted = true;
    // stop here if form is invalid

    if (this.leaveModel.invalid) {

      for (const key of Object.keys(this.leaveModel.controls)) {
        if (this.leaveModel.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      return;
    }


    this.leaveObj = this.leaveModel.value;

    if (parseFloat(this.leaveObj.duration) == 0 && (this.leaveObj.leaveTypeId == "300001" || this.leaveObj.leaveTypeId == "300002")) {
      this.AddUpdateLeave();
    }
    else {
      this.leaveObj.EmployeeId = this.employeeId;
      this.leaveObj.LeaveTypeID = this.leaveObj.leaveTypeId;
      this.leaveObj.StartDate = this.datePipe.transform(this.leaveModel.get('fromDate').value, 'yyyy-MM-dd');
      this.leaveObj.EndDate = this.datePipe.transform(this.leaveModel.get('toDate').value, 'yyyy-MM-dd');
      this.leaveObj.StartTime = this.datePipe.transform(this.leaveModel.get('fromTime').value, 'h:mm a');
      this.leaveObj.EndTime = this.datePipe.transform(this.leaveModel.get('toTime').value, 'h:mm a');
      this.leaveObj.Duration = parseFloat(this.leaveObj.duration);
      this.leaveObj.Description = this.leaveObj.description;

      this.spinner.show();
      this.leavesService.ConfirmationApplyLeaves(this.leaveObj).subscribe(
        res => {
          this.spinner.hide();
          if (res.Status == 200) {
            this.confirmationObj = res.Data;
            this.modalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false, class: 'modal-md' });
          }
          else
            this.globalService.showNotification(res.Message);
        },
        error => {
          this.spinner.hide();
          console.log(error);
        });
    }
  }

  leaveConfirmationTemplateDecline() {
  }

  leaveConfirmationTemplateAccept() {
    this.modalRef.hide();
    this.AddUpdateLeave();
  }

  AddUpdateLeave() {
    
    this.leaveObj = this.leaveModel.value;
    this.leaveObj.EmployeeId = this.employeeId;
    this.leaveObj.LeaveTypeID = this.leaveObj.leaveTypeId;
    this.leaveObj.StartDate = this.datePipe.transform(this.leaveModel.get('fromDate').value, 'yyyy-MM-dd');
    this.leaveObj.EndDate = this.datePipe.transform(this.leaveModel.get('toDate').value, 'yyyy-MM-dd');
    this.leaveObj.StartTime = this.datePipe.transform(this.leaveModel.get('fromTime').value, 'h:mm a');
    this.leaveObj.EndTime = this.datePipe.transform(this.leaveModel.get('toTime').value, 'h:mm a');
    this.leaveObj.Duration = parseFloat(this.leaveObj.duration);
    this.leaveObj.LeaveRuleID = this.confirmationObj.LeaveRuleID;

    this.leaveObj.Description = this.leaveObj.description;

    if (this.leaveObj.leaveId > 0)
      this.leaveObj.type = "U";
    else
      this.leaveObj.type = "I";

    this.leaveObj.attachments = this.attachments;

    this.spinner.show();
    this.leavesService.ApplyLeaves(this.leaveObj).subscribe(
      res => {
        this.spinner.hide();
        if (res.Status == 200) {
          this.reset();
          this.globalService.showNotification(res.Message);
        }
        else
          this.globalService.showNotification(res.Message);
      },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  reset() {
    let _date = new Date();
    this.submitted = false;
    this.leaveTypes = [];
    this.attachments = [];
    this.leaveModel.reset();
    this.minToDate = _date;
    this.leaveModel.controls['employeeId'].setValue('');
    this.leaveModel.controls['leaveTypeId'].setValue('');
    this.leaveModel.controls['description'].setValue('');
    this.leaveModel.controls['fromDate'].setValue(_date);
    this.leaveModel.controls['toDate'].setValue(_date);
    this.leaveModel.controls['fromDate'].enable();
    this.leaveModel.controls['toDate'].enable();
    this.leaveModel.controls['fromTime'].disable();
    this.leaveModel.controls['toTime'].disable();
    this.leaveModel.controls['fromTime'].setValidators([Validators.required]);
    this.leaveModel.controls['toTime'].setValidators([Validators.required]);
    this.leaveModel.controls['fromTime'].setValidators(null);
    this.leaveModel.controls['fromTime'].setValidators(null);
    this.leaveModel.controls['expectedDeliveryDate'].setValidators(null);
    this.leaveModel.updateValueAndValidity();
    this.CalculateDiffFromAndToDate(this.leaveModel.controls['fromDate'].value, this.leaveModel.controls['toDate'].value);
    this.getEmployeeWiseLeaveTypes(this.employeeId);
  }

  checkExtension(file: File) {
    let valToLower = file.name.toLowerCase();
    let regex = new RegExp("(.*?)\.(jpg|png|jpeg)$"); //add or remove required extensions here
    let regexTest = regex.test(valToLower);
    return regexTest ? true : false;
  }

  onAddAttachment(event) {

    if (!this.checkExtension(<File>event.target.files[0])) {
      this.globalService.showNotification('Invalid File Type.');
      return;
    }

    if (event.target.files.length > 0 && event.target.files[0].size < 2000000) {
      let fileToUpload = <File>event.target.files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.imageService.uploadImage(formData).subscribe(
        res => {
          this.attachments.push({
            'FileName': res[0].filename,
            'FileType': res[0].type,
            'FileSize': res[0].size,
            'OriginalFileName': res[0].originalname,
            'extension': res[0].extension,
            'fileUrl': res[0].fileUrl,
          });
        },
        error => {
          console.log(error);
        });
    }
    else {
      this.globalService.showNotification('Document file must be less than 2mb.');
      this.leaveModel.controls['photoAttachment'].setValue('');
    }
  }

  onDeleteAttachment(index, filename) {
    this.imageService.deleteImage(filename).subscribe(
      () => {
        this.attachments.splice(index, 1);
      },
      error => {
        console.log(error);
      });
  }

  onChangeEmployeeId(val) {
    if (val != "" && val != null) {
      this.employeeId = val;
      this.reset();
      this.leaveModel.controls['employeeId'].setValue(this.employeeId);
      if (this.leaveModel.value.leaveTypeId == "300003") {
        this.getBirthdayDateOfEmployee(this.employeeId, this.leaveModel.value.leaveTypeId);
      }
      this.getEmployeeWiseLeaveTypes(val);
    }
    else {
      this.reset();
    }
  }

  onChangeLeaveType(val) {
    let _date = new Date();

    if (val == "300001") {

      let dateString = new Date(_date.toLocaleDateString())
      let toTimeString = new Date(_date.toLocaleDateString())

      dateString = new Date(dateString.setHours(9));
      toTimeString = new Date(toTimeString.setHours(13));

      let newDate = new Date(dateString);
      let newToTime = new Date(toTimeString);
      this.leaveModel.controls['dayType'].setValue('0.5');
      this.leaveModel.controls['fromDate'].setValue(newDate);
      this.leaveModel.controls['toDate'].setValue(newDate);
      this.leaveModel.controls['fromTime'].setValue(newDate);
      this.leaveModel.controls['toTime'].setValue(newToTime);

      this.leaveModel.controls['fromDate'].enable();
      this.leaveModel.controls['toDate'].disable();
      this.leaveModel.controls['fromTime'].enable();
      this.leaveModel.controls['toTime'].disable();

      this.leaveModel.controls['fromTime'].setValidators([Validators.required]);
      this.leaveModel.controls['toTime'].setValidators([Validators.required]);
      this.leaveModel.updateValueAndValidity();
      this.CalculateDiffFromAndToDate(this.leaveModel.controls['fromDate'].value, this.leaveModel.controls['toDate'].value);

    }
    else if (val == "300002") {

      this.leaveModel.controls['fromDate'].setValue(_date);
      this.leaveModel.controls['toDate'].setValue(_date);

      this.leaveModel.controls['fromDate'].enable();
      this.leaveModel.controls['toDate'].enable();

      this.leaveModel.controls['fromTime'].setValidators([Validators.required]);
      this.leaveModel.controls['toTime'].setValidators([Validators.required]);
      this.leaveModel.updateValueAndValidity();

    }
    else if (val == "300003") {

      this.getBirthdayDateOfEmployee(this.employeeId, val);

      this.leaveModel.controls['fromDate'].disable();
      this.leaveModel.controls['toDate'].disable();
      this.leaveModel.controls['fromTime'].enable();
      this.leaveModel.controls['toTime'].disable();

      this.leaveModel.controls['fromTime'].setValidators([Validators.required]);
      this.leaveModel.controls['toTime'].setValidators([Validators.required]);
      this.leaveModel.updateValueAndValidity();
    }
    else if (val == "300004") {
      this.minDate = _date;
      this.minToDate = _date;

      this.leaveModel.controls['fromDate'].setValue(_date);
      this.leaveModel.controls['toDate'].setValue(_date);

      this.leaveModel.controls['fromDate'].enable();
      this.leaveModel.controls['toDate'].enable();
      this.leaveModel.controls['fromTime'].setValue('');
      this.leaveModel.controls['toTime'].setValue('');

      this.leaveModel.controls['fromTime'].setValidators(null);
      this.leaveModel.controls['toTime'].setValidators(null);
      this.leaveModel.updateValueAndValidity();
      this.CalculateDiffFromAndToDate(this.leaveModel.controls['fromDate'].value, this.leaveModel.controls['toDate'].value);
    }
    else if (val == "300005") {
      this.leaveModel.controls['expectedDeliveryDate'].setValue(_date);
      this.leaveModel.controls['expectedDeliveryDate'].setValidators([Validators.required]);
      this.leaveModel.updateValueAndValidity();
    }
    else if (val == "300006") {
      this.minDate = new Date(_date.toLocaleDateString());
      this.leaveModel.controls['fromDate'].setValue(_date);
      this.minToDate = new Date(_date.toLocaleDateString());
      this.leaveModel.controls['toDate'].setValue(new Date(_date.setDate(_date.getDate() + 2)));

      this.leaveModel.controls['fromDate'].enable();
      this.leaveModel.controls['toDate'].enable();
      this.leaveModel.controls['expectedDeliveryDate'].setValidators(null);
      this.leaveModel.updateValueAndValidity();
      this.CalculateDiffFromAndToDate(this.leaveModel.controls['fromDate'].value, this.leaveModel.controls['toDate'].value);
    }
    else if (val == "300007") {
      let _fromDate = new Date(_date);
      let _toDate = new Date(_date);

      this.minDate = _fromDate;
      this.leaveModel.controls['fromDate'].setValue(_fromDate);
      _toDate = new Date(_toDate.setDate(_toDate.getDate() + 1));
      this.minToDate = _fromDate;
      this.leaveModel.controls['toDate'].setValue(_toDate);

      this.leaveModel.controls['fromDate'].enable();
      this.leaveModel.controls['toDate'].enable();

      this.CalculateDiffFromAndToDate(this.leaveModel.controls['fromDate'].value, this.leaveModel.controls['toDate'].value);
      this.leaveModel.controls['expectedDeliveryDate'].setValidators(null);
      this.leaveModel.controls['fromTime'].setValidators(null);
      this.leaveModel.controls['toTime'].setValidators(null);
      this.leaveModel.updateValueAndValidity();
    }
    else {

      this.leaveModel.controls['fromDate'].setValue(_date);
      this.leaveModel.controls['toDate'].setValue(_date);

      this.leaveModel.controls['fromDate'].enable();
      this.leaveModel.controls['toDate'].enable();
      this.leaveModel.controls['fromTime'].enable();
      this.leaveModel.controls['toTime'].enable();

      this.leaveModel.controls['fromTime'].setValidators(null);
      this.leaveModel.controls['toTime'].setValidators(null);
      this.leaveModel.controls['expectedDeliveryDate'].setValidators(null);
      this.leaveModel.updateValueAndValidity();

      this.CalculateDiffFromAndToDate(this.leaveModel.controls['fromDate'].value, this.leaveModel.controls['toDate'].value);
    }
  }

  onChangeExpectedDeliveryDate(ev) {
    let _fromDate = new Date(ev);
    let _toDate = new Date(ev);

    _fromDate = new Date(_fromDate.setDate(_fromDate.getDate() - 126));
    this.minDate = null;
    this.leaveModel.controls['fromDate'].setValue(_fromDate);
    _toDate = new Date(_toDate.setDate(_toDate.getDate() + 56));
    this.minToDate = _fromDate;
    this.leaveModel.controls['toDate'].setValue(_toDate);

    this.leaveModel.controls['fromDate'].disable();
    this.leaveModel.controls['toDate'].disable();

  }

  onChangeFromDate(ev) {
    
    if (this.leaveModel.value.leaveTypeId == "300001" || this.leaveModel.value.leaveTypeId == "300003") {
      this.minToDate = new Date();
      this.leaveModel.controls['toDate'].setValue(ev);
      this.CalculateDiffFromAndToDate(ev, this.leaveModel.controls['toDate'].value);
    }
    else if (this.leaveModel.value.leaveTypeId == "300002") {
      this.minToDate = ev;
      this.leaveModel.controls['toDate'].setValue(ev);
      this.CalculateDiffFromAndToDate(ev, this.leaveModel.controls['toDate'].value);
    }
    else if (this.leaveModel.value.leaveTypeId == "300003") {
      this.minToDate = new Date();
      this.leaveModel.controls['toDate'].setValue(ev);
      this.leaveModel.controls['duration'].setValue('0.5');
    }
    else if (this.leaveModel.value.leaveTypeId == "300004") {
      this.minToDate = ev;
      this.leaveModel.controls['toDate'].setValue(ev);
      this.CalculateDiffFromAndToDate(ev, this.leaveModel.controls['toDate'].value);
    }
    else if (this.leaveModel.value.leaveTypeId == "300005") {
      // meternity logic
    }
    else if (this.leaveModel.value.leaveTypeId == "300006") {
      let _date = new Date(ev.toLocaleDateString());
      this.minToDate = new Date(ev.toLocaleDateString());
      let _toDate = new Date(_date.setDate(_date.getDate() + 2));
      this.leaveModel.controls['toDate'].setValue(_toDate);
      this.CalculateDiffFromAndToDate(ev, _toDate);
    }
    else if (this.leaveModel.value.leaveTypeId == "300007") {
      let _fromDate = ev;
      let _toDate = new Date(ev.toLocaleDateString());
      this.minToDate = _fromDate;
      this.leaveModel.controls['toDate'].setValue(new Date(_toDate.setDate(_toDate.getDate() + 1)));
      this.CalculateDiffFromAndToDate(ev, this.leaveModel.controls['toDate'].value);
    }
    else {
      this.minToDate = ev;
      this.leaveModel.controls['toDate'].setValue(ev);
      this.CalculateDiffFromAndToDate(ev, this.leaveModel.controls['toDate'].value);
    }
  }

  onChangeToDate(ev) {
    if (ev != null) {
      if (this.leaveModel.value.leaveTypeId == "300001" || this.leaveModel.value.leaveTypeId == "300003") {
        this.leaveModel.get('duration').setValue('0.5');
      }
      else
        this.CalculateDiffFromAndToDate(this.leaveModel.controls['fromDate'].value, ev);
    }
  }

  onDayTypeChange(val) {
    if (this.leaveModel.value.leaveTypeId == "300003") {
      this.CalculateDiffFromAndToDate(this.leaveModel.controls['fromDate'].value, this.leaveModel.controls['toDate'].value);
    }
    else
      this.leaveModel.get('duration').setValue(val);
  }

  getBirthdayDateOfEmployee(employeeId, leaveTypeId) {
    this.leavesService.BirthdayValidation(employeeId, leaveTypeId).subscribe(
      res => {
        if (res.Status == 200) {

          let currentDate = new Date();
          let _date = new Date(new Date(res.Data.EmployeeDOB).toLocaleDateString());
          _date.setFullYear(currentDate.getFullYear());

          let dateString = new Date(_date.setHours(9));
          let toTimeString = new Date(_date.setHours(13));

          this.leaveModel.controls['fromDate'].setValue(dateString);
          this.leaveModel.controls['toDate'].setValue(dateString);
          this.leaveModel.controls['fromTime'].setValue(dateString);
          this.leaveModel.controls['toTime'].setValue(toTimeString);

          this.leaveModel.controls['dayType'].setValue('0.5');
          this.leaveModel.controls['duration'].setValue('0.5');

        }
        else {
          this.leaveModel.controls['fromDate'].setValue('');
          this.leaveModel.controls['toDate'].setValue('');
          this.leaveModel.controls['fromTime'].setValue('');
          this.leaveModel.controls['toTime'].setValue('');
          this.leaveModel.get('duration').setValue('0');
          this.globalService.showNotification(res.Message);
        }
      },
      error => {
        console.log(error);
      });
  }

  OnChangeFromTime(event) {
    
    if (this.leaveModel.value.leaveTypeId == "300001" || this.leaveModel.value.leaveTypeId == "300003") {
      let _dateTime = new Date(event.value);
      this.minToTime = _dateTime;
      let newToTime = new Date(_dateTime.setTime(_dateTime.getTime() + (4 * 60 * 60 * 1000)));
      this.leaveModel.controls['toTime'].setValue(newToTime);
    }
    else {
      this.minToTime = new Date(event.value);
      this.leaveModel.controls['toTime'].setValue('');
      // this.leaveModel.controls['toTime'].enable();
    }
  }

  CalculateDiffFromAndToDate(fromDate, toDate) {

    if (fromDate != null || toDate != null) {
      let calObj = {
        'EmployeeID': this.employeeId,
        'Startdate': this.datePipe.transform(fromDate, 'yyyy-MM-dd'),
        'Enddate': this.datePipe.transform(toDate, 'yyyy-MM-dd')
      };

      this.leavesService.CalculateDiffFromAndToDate(calObj).subscribe(
        res => {
          if (res.Status == 200) {
            if (this.leaveModel.value.leaveTypeId == "300001") {
              if (res.Data == 0)
                this.leaveModel.get('duration').setValue(res.Data);
              else
                this.leaveModel.get('duration').setValue('0.5');
            }
            else if (this.leaveModel.value.leaveTypeId == "300003") {
              if (res.Data == 0)
                this.leaveModel.get('duration').setValue(res.Data);
              else
                this.leaveModel.get('duration').setValue(this.leaveModel.value.dayType);
            }
            else
              this.leaveModel.get('duration').setValue(res.Data);
          }
          else
            this.leaveModel.get('duration').setValue(res.Data);
        },
        error => {
          console.log(error);
        });
    }
  }

  calcDaysDiff(date1, date2) {
    let diffc = date1.getTime() - date2.getTime();
    let days = Math.round(Math.abs(diffc / (1000 * 60 * 60 * 24)));
    this.leaveModel.get('duration').setValue(days + 1);
  }

  onCancel() {
    this.submitted = false;
    this.leaveModel.reset();
    this.leaveModel.controls['employeeId'].setValue('');
    this.leaveModel.controls['leaveTypeId'].setValue('');
    window.location.reload();
  }

  getRoleWiseEmployeeList() {
    this.spinner.show();
    this.commonService.GetEmployeeListingRoleWise().subscribe(
      res => {
        this.employees = [];
        this.spinner.hide();
        if (res.Status == 200) {
          this.employees = res.Data;
          this.leaveModel.controls['employeeId'].setValue(this.currentUser.userId);
        }
      },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  getEmployeeWiseLeaveTypes(employeeId) {
    this.spinner.show();
    this.commonService.GetEmployeeWiseLeaveTypes(employeeId).subscribe(
      res => {
        this.spinner.hide();
        this.leaveTypes = [];
        if (res.Status == 200) {
          this.leaveTypes = res.Data;
        }
      },
      error => {
        this.leaveTypes = [];
        this.spinner.hide();
        console.log(error);
      });
  }

}