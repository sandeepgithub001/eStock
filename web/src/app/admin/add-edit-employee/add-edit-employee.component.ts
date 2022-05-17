import { Component, OnInit, ElementRef, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConfig } from 'src/Globals/app.config';
import { EmployeeService } from 'src/app/Services/employee.service';
import { CommonService } from 'src/app/Services/common.service';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogService } from 'src/app/components/confirmation-dialog/confirmation-dialog.service';
import { ImageService } from 'src/app/Services/image.service';
import { emailDomain } from 'src/app/validators/custom.validators';
import { Select2OptionData } from 'ng2-select2';



@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})

// this.minDate.setDate(this.minDate.getDate() - 1);
export class AddEditEmployeeComponent implements OnInit, AfterViewChecked {
  empId: number = 0;
  minDate = new Date();
  maxDate = new Date();
  minLastWorkingDate = new Date();
  bsConfig: any;
  employees: any = [];
  employeeId: number = 0;
  projectManagers = [];
  departments: any = [];
  countryCodes: Array<Select2OptionData>;
  countryCodeSelectedValue: string;
  employeeStatus: any = [];
  employeeModel: FormGroup;
  submitted = false;
  attachmentFile: string = "";
  attachmentFileName: string = "";
  attachmentFileType: string = "";
  empObj: any = {}; // = new AddUpdateEmployeeRequestViewModel();
  selectedItems = [];
  dropdownSettings: any = {};
  emailTaken: boolean = false;
  employeeCodeTaken: boolean = false;
  progress: number = 0;
  attachmentObj: any = null;
  statusId: boolean = true;

  constructor(
    private spinner: Ng4LoadingSpinnerService,
    private router: Router,
    private globalService: AppConfig,
    private employeeService: EmployeeService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private confirmationDialogService: ConfirmationDialogService,
    private el: ElementRef,
    private imageService: ImageService,
  ) {
    this.route.params.subscribe(params => {
      let id = parseInt(params["id"]);
      if (id > 0) {
        this.empId = id;
        this.getDepartments();
        this.getCountryCodes();
        this.getEmployeeList();
        this.getEmployeeDetails(id);
      }
      else {
        this.getCountryCodes();
        this.getDepartments();
        this.getEmployeeList();        
      }
    });
  }

  // , ValidateEmailNotTaken.createValidator(this.empId, this.commonService)
  // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
  // this.validateEmailNotTaken.bind(this)

  ngAfterViewChecked()
{
    if (document.getElementsByClassName("pure-checkbox").length > 0 && document.getElementById("pure0") === null) 
    {
        const purecssinput = document.querySelectorAll('li.pure-checkbox input');
        purecssinput.forEach((x, i) => x.setAttribute("id", "pure" + i));
        const purecsslabel = document.querySelectorAll('li.pure-checkbox label');
        purecsslabel.forEach((x, i) => x.setAttribute("for", "pure" + i));
    }
}

  ngOnInit() {

    const purecssinput = document.querySelectorAll('li.pure-checkbox input');
    purecssinput.forEach((x,i)=>x.setAttribute("id", "pure" + i));

     const purecsslabel = document.querySelectorAll('li.pure-checkbox label');
     purecsslabel.forEach((x,i)=>x.setAttribute("for", "pure" + i));
    
    // const purecss = document.querySelector('.autocomplete-container input');
    // purecss.setAttribute("id", "empSearch");

    this.employeeModel = this.formBuilder.group({
      employeeId: ['0'],
      employeeCode: ['', [Validators.required, Validators.maxLength(50)]],
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      emailAddress: ['', [Validators.required, Validators.email, Validators.maxLength(50), emailDomain]],
      photoAttachment: [''],
      dateOfbirth: ['', Validators.required],
      gender: ['1', Validators.required],
      marriageAnniversary: [''],
      countryCode: ['+91'],
      mobileNumber: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12)])],
      dateOfjoining: ['', Validators.required],
      departmentId: ['', Validators.required],
      jobTitle: ['', Validators.compose([Validators.maxLength(50)])],
      jobRole: ['', Validators.compose([Validators.maxLength(50)])],
      reportingManagerId: ['', Validators.required],
      projectManagerId: [''],
      initiaLeaveBalance: ['0', Validators.required],
      initialImmediateBalance: ['1', Validators.required],
      lastWorkingDay: [''],
      statusId: ['1'],
      isHR: ['0'],
    });
    this.countryCodeSelectedValue = "+246";
    
  }

  ValidateEmployeeCodeNotTaken(val) {
    if (this.employeeModel.controls["employeeCode"].valid) {
      this.commonService.checkEmployeeCodeNotTaken(val)
        .subscribe(res => {
          console.log(res.Data);
          this.employeeCodeTaken = res.Data;
        });
    }
    else
      this.employeeCodeTaken = false;
  }

  validateEmailNotTaken(val) {
    if (this.employeeModel.controls["emailAddress"].valid) {
      this.commonService.checkEmailNotTaken(this.empId, val)
        .subscribe(res => {
          console.log(res.Data);
          this.emailTaken = res.Data;
        });
    }
    else
      this.emailTaken = false;
  }

  onStatusChange(val) {
    let _lastWorkingDate = new Date();
    if (val === "1") {
      this.employeeModel.controls['lastWorkingDay'].clearValidators();
      this.employeeModel.get('lastWorkingDay').setValue('');
      this.employeeModel.updateValueAndValidity();
      this.statusId = true;
    }
    else {
      this.employeeModel.controls['lastWorkingDay'].setValidators([Validators.required]);
      this.employeeModel.get('lastWorkingDay').setValue(_lastWorkingDate);
      this.employeeModel.updateValueAndValidity();
      this.statusId = false;
    }
  }

  onReportingManagerChange(ev: any) {
    if (ev.target.value != "") {
      this.projectManagers = [];
      let tempProjectManagers = this.employees;
      tempProjectManagers.forEach(el => {
        this.projectManagers.push({
          "id": el.ID, "itemName": el.Name
        });
      });
      this.dropdownSettings = {
        singleSelection: false,
        enableCheckAll: false,
        showCheckbox: true,
        enableSearchFilter: true,
        enableFilterSelectAll: false,
        classes: "custom-multi-select"
      };
    }
  }

  onChangeJoiningDate(event) {
    this.employeeModel.controls['lastWorkingDay'].setValue('');
    this.minLastWorkingDate = new Date(event);
    // this.leaveModel.controls['AuctionEndDate'].enable();
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
          this.attachmentObj = res[0];
          console.log(this.attachmentObj);
        },
        error => {
          console.log(error);
        });
    }
    else {
      this.globalService.showNotification('Document file must be less than 2mb.');
      this.employeeModel.controls['photoAttachment'].setValue('');
    }
  }

  onDeleteAttachment(filename) {

    this.imageService.deleteImage(filename).subscribe(
      () => {
        this.attachmentObj = null;
      },
      error => {
        console.log(error);
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.employeeModel.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.employeeModel.invalid) {
      for (const key of Object.keys(this.employeeModel.controls)) {
        if (this.employeeModel.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
      return;
    }

    let content = '';
    if (this.employeeModel.get('employeeId').value == "0")
      content = 'Are you sure you want to Add a new Employee - ' + this.employeeModel.get('firstName').value + " " + this.employeeModel.get('lastName').value;
    else {
      if (this.employeeModel.get('statusId').value == "1")
        content = 'Are you sure you want to Update Employee - ' + this.employeeModel.get('firstName').value + " " + this.employeeModel.get('lastName').value;
      else {
        content = 'Are you sure the email ID has been edited successfully before Inactivating the Profile?';
      }
    }

    this.confirmationDialogService.confirm('Alert', content)
      .then((confirmed) => {
        if (confirmed)
          this.AddUpdateEmployee();
        else
          console.log('Request cancelled successfully.');
      })
      .catch(() =>
        console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)')
      );
  }

  AddUpdateEmployee() {

    this.empObj = this.employeeModel.value;
    debugger;
    this.empObj.employeeId = parseInt(this.empObj.employeeId);
    this.empObj.employeeCode = this.employeeModel.get('employeeCode').value.toString();
    this.empObj.gender = parseInt(this.empObj.gender);
    this.empObj.mobileNumber = this.empObj.mobileNumber.toString();
    this.empObj.departmentId = parseInt(this.empObj.departmentId);
    this.empObj.jobRole = this.employeeModel.get('jobRole').value;
    this.empObj.isHR = Boolean(this.empObj.isHR == "0" ? false : true);
    this.empObj.reportingManagerId = parseInt(this.empObj.reportingManagerId);
    this.empObj.initiaLeaveBalance = parseFloat(this.empObj.initiaLeaveBalance);
    this.empObj.initialImmediateBalance = parseFloat(this.empObj.initialImmediateBalance);
    this.empObj.statusId = parseInt(this.empObj.statusId);

    if (this.empObj.employeeId == 0) {
      this.empObj.type = "I";
      if (this.attachmentObj != null) {
        this.empObj.OriginalFileName = this.attachmentObj.originalname;
        this.empObj.FileName = this.attachmentObj.filename;
        this.empObj.FileType = this.attachmentObj.type;
        this.empObj.FileSize = this.attachmentObj.size;
        this.empObj.AttachmentID = 0;
      }
    }
    else {
      this.empObj.type = "U";
      if (this.attachmentObj != null) {
        this.empObj.OriginalFileName = this.attachmentObj.originalname;
        this.empObj.FileName = this.attachmentObj.filename;
        this.empObj.FileType = this.attachmentObj.type;
        this.empObj.FileSize = this.attachmentObj.size;
        this.empObj.AttachmentID = this.attachmentObj.AttachmentId;
      }
    }



    this.empObj.dateOfbirth = this.datePipe.transform(this.employeeModel.get('dateOfbirth').value, 'yyyy-MM-dd');
    this.empObj.dateOfjoining = this.datePipe.transform(this.employeeModel.get('dateOfjoining').value, 'yyyy-MM-dd');
    this.empObj.lastWorkingDay = this.datePipe.transform(this.employeeModel.get('lastWorkingDay').value, 'yyyy-MM-dd');
    this.empObj.marriageAnniversary = this.datePipe.transform(this.employeeModel.get('marriageAnniversary').value, 'yyyy-MM-dd');
    this.empObj.projectManagerList = this.selectedItems;

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
          this.projectManagers = [];
          this.employees = res.Data;
          res.Data.forEach(el => {
            this.projectManagers.push({
              "id": el.ID, "itemName": el.Name
            });
          });
          this.dropdownSettings = {
            singleSelection: false,
            enableCheckAll: false,
            showCheckbox: true,
            enableSearchFilter: true,
            enableFilterSelectAll: false,
            classes: "custom-multi-select"
          };
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
          let empObj = res.Data;

          if (empObj.employeeAttachmentVM != null) {
            this.attachmentObj = {
              "AttachmentId": empObj.employeeAttachmentVM.AttachmentId,
              "originalname": empObj.employeeAttachmentVM.Name,
              "type": empObj.employeeAttachmentVM.FileType,
              "size": empObj.employeeAttachmentVM.FileSize,
              "filename": empObj.employeeAttachmentVM.FileName,
              "extension": empObj.employeeAttachmentVM.FileType,
              "fileUrl": empObj.employeeAttachmentVM.FileUrl,
            }
          }
          this.employeeModel.controls['employeeCode'].disable();
          let DOB = null;
          let WeddingAnniversary = null;
          let JoiningDate = null;
          let LastWorkingDate = null;

          if (empObj.DOB != null)
            DOB = new Date(empObj.DOB);
          if (empObj.WeddingAnniversary != null)
            WeddingAnniversary = new Date(empObj.WeddingAnniversary);
          if (empObj.JoiningDate != null) {
            JoiningDate = new Date(empObj.JoiningDate);
            this.minLastWorkingDate = new Date(empObj.JoiningDate);
          }
          if (empObj.LastWorkingDate != null) {
            LastWorkingDate = new Date(empObj.LastWorkingDate);
          }

          this.employeeModel.patchValue({
            employeeId: empObj.Id,
            employeeCode: empObj.EmployeeCode,
            firstName: empObj.FirstName,
            lastName: empObj.LastName,
            emailAddress: empObj.Email,
            dateOfbirth: DOB,
            gender: empObj.Gender.toString(),
            marriageAnniversary: WeddingAnniversary,
            mobileNumber: empObj.MobileNumber,
            countryCode: empObj.Countrycode,
            dateOfjoining: JoiningDate,
            departmentId: empObj.DepartmentId,
            jobTitle: empObj.JobTitle,
            jobRole: empObj.JobRole,
            reportingManagerId: empObj.ReportingManagerid,
            projectManagerId: empObj.ProjectManagerid,
            initiaLeaveBalance: empObj.InitialBalance,
            initialImmediateBalance: empObj.InitialImidiateBalance,
            lastWorkingDay: LastWorkingDate,
            statusId: empObj.StatusID,
            isHR: empObj.IsHR ? "1" : "0",
          });

          debugger;
          this.countryCodeSelectedValue = empObj.Countrycode;

          if (empObj.StatusID === 1) {
            this.employeeModel.controls['lastWorkingDay'].clearValidators();
            // this.employeeModel.get('lastWorkingDay').setValue('');
            this.employeeModel.updateValueAndValidity();
            this.statusId = true;
          }
          else {
            this.employeeModel.controls['lastWorkingDay'].setValidators([Validators.required]);
            this.employeeModel.updateValueAndValidity();
            this.statusId = false;
          }

          this.selectedItems = [];
          empObj.projectManagerList.forEach(el => {
            this.selectedItems.push({
              "id": el.ID, "itemName": el.Name
            });
          });
          this.dropdownSettings = {
            singleSelection: false,
            showCheckbox: true,
            enableCheckAll: false,
            enableSearchFilter: true,
            enableFilterSelectAll: false,
            classes: "custom-multi-select"
          };
        }
        else
          this.globalService.showNotification(res.Message);
      },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  onItemSelect(ev) {
  }

  // ////////// MuliSelect Open Method start //////////

  // onOpen(ev) {

  //   const purecssinput = document.querySelectorAll('li.pure-checkbox input');
  //   purecssinput.forEach((x,i)=>x.setAttribute("id", "pure" + i));

  //    const purecsslabel = document.querySelectorAll('li.pure-checkbox label');
  //    purecsslabel.forEach((x,i)=>x.setAttribute("for", "pure" + i));

  // }
  //   ////////// MuliSelect Open Method end //////////

  onItemDeSelect(item: any) {
    this.selectedItems = this.selectedItems.filter(x => x.id != item.id);
  }

  onDeSelectAll(ev) {
    this.selectedItems = [];
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

  onCountryCodeChanged(e: any) {
    this.countryCodeSelectedValue = e.value;
    this.employeeModel.controls["countryCode"].setValue(e.value);
  }

  getCountryCodes() {
    this.commonService.GetCountryCodes().subscribe(
      res => {
        if (res.Status == 200) {
          let tempList = [];
          res.Data.forEach(el => {
            tempList.push({
              id: el.Code, text: el.Code
            });
          });
          this.countryCodes = tempList;
          this.countryCodeSelectedValue = '+91';
        }
      },
      error => {
        console.log(error);
      });
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}