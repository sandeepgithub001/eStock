import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppConfig } from 'src/Globals/app.config';
import { EmployeeService } from 'src/app/Services/employee.service';
import { environment } from 'src/environments/environment';
import { EmployeeListRequest } from 'src/app/models/api-request.model';
import { CommonService } from 'src/app/Services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  keyword = 'Name';
  searchKey: any;
  statusId: string = "1";
  totalRecords: number = 0;
  autoCompleteEmployees: any = [];
  employees: any = [];
  empObj = new EmployeeListRequest();
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';

  constructor(
    private spinner: Ng4LoadingSpinnerService,
    public globalService: AppConfig,
    private employeeService: EmployeeService,
    private commonService: CommonService,
    private router: Router,
  ) {
  }

  ngOnInit() {
 
    //add id to autocomplete input field//
    const autoCompleteId = document.querySelector('.autocomplete-container input');
    autoCompleteId.setAttribute("id", "empSearch");

    //create dynamic label and assign attributes//
    const employeLabel = document.createElement("label");
    employeLabel.setAttribute("class", "sr-only");
    employeLabel.setAttribute("for", "empSearch");
    employeLabel.innerText='Search';
    document.querySelector('.autocomplete-container .input-container').appendChild(employeLabel);

    this.empObj.SearchKey = "";
    this.empObj.IsActive = this.statusId == "1" ? true : false;
    this.empObj.Skip = 0;
    this.empObj.Size = environment.defaultPageSize;
    this.empObj.TOTALRECORDS = 0;
    this.empObj.IsExport = false;
    this.getEmployeeList(this.empObj);
    this.getAutoCompleteEmployees(this.empObj.IsActive);
  }

  // selectEvent(item) {
  //   this.empObj.SearchKey = item.name;
  //   this.empObj.IsActive = this.statusId == "1" ? true : false;
  //   this.empObj.Skip = 0;
  //   this.empObj.Size = environment.defaultPageSize;
  //   this.empObj.IsExport = false;
  //   this.getEmployeeListOnCustomeSearch(this.empObj)
  // }

  onFocused(e) {
    this.getAutoCompleteEmployees(this.empObj.IsActive);
  }

  onScroll(ev) {
    this.empObj.Skip += environment.defaultPageSize;
    this.empObj.Size = environment.defaultPageSize;
    this.getEmployeeList(this.empObj)
  }

  onReset() {
    this.searchKey = "";
    this.empObj.SearchKey = "";
    this.empObj.IsActive = true;
    this.statusId = "1";
    this.empObj.Skip = 0;
    this.empObj.Size = environment.defaultPageSize;
    this.empObj.IsExport = false;
    this.getEmployeeListOnCustomeSearch(this.empObj)
  }

  onStatusChange() {
    let typeOf = typeof (this.searchKey);
    if (typeOf == "string" || typeOf == "undefined")
      this.empObj.SearchKey = this.searchKey == undefined ? "" : this.searchKey;
    else
      this.empObj.SearchKey = this.searchKey.name;

    this.empObj.IsActive = this.statusId == "1" ? true : false;
    this.empObj.Skip = 0;
    this.empObj.Size = environment.defaultPageSize;
    this.empObj.IsExport = false;
    this.getEmployeeListOnCustomeSearch(this.empObj)
    this.getAutoCompleteEmployees(this.empObj.IsActive);
  }

  onEnterKeyPressed(ev) {

    let typeOf = typeof (this.searchKey);
    if (typeOf == "string" || typeOf == "undefined")
      this.empObj.SearchKey = this.searchKey == undefined ? "" : this.searchKey;
    else
      this.empObj.SearchKey = this.searchKey.name;
      
    this.empObj.IsActive = this.statusId == "1" ? true : false;
    this.empObj.Skip = 0;
    this.empObj.Size = environment.defaultPageSize;
    this.empObj.IsExport = false;
    this.getEmployeeListOnCustomeSearch(this.empObj)
  }

  onSearchKeyButtonPressed() {
    let typeOf = typeof (this.searchKey);
    if (typeOf == "string" || typeOf == "undefined")
      this.empObj.SearchKey = this.searchKey == undefined ? "" : this.searchKey;
    else
      this.empObj.SearchKey = this.searchKey.name;
      
    this.empObj.IsActive = this.statusId == "1" ? true : false;
    this.empObj.Skip = 0;
    this.empObj.Size = environment.defaultPageSize;
    this.empObj.IsExport = false;
    this.getEmployeeListOnCustomeSearch(this.empObj)
  }

  getEmployeeList(modal) {
    this.spinner.show();
    this.employeeService.GetEmployeeList(modal).subscribe(
      res => {
        this.spinner.hide();
        if (res.Status == 200) {
          res.Data.getEmployee.forEach(element => {
            this.employees.push(element);
          });
          this.totalRecords = res.Data.TotalRecord;
        }
        else
          this.globalService.showNotification('Failed!!');
      },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  getEmployeeListOnCustomeSearch(modal) {
    this.spinner.show();
    this.employees = [];
    this.employeeService.GetEmployeeList(modal).subscribe(
      res => {
        this.spinner.hide();
        if (res.Status == 200) {
          res.Data.getEmployee.forEach(element => {
            this.employees.push(element);
          });
          this.totalRecords = res.Data.TotalRecord;
        }
        else
          this.globalService.showNotification('Failed!!');
      },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  onEdit(empId) {
    this.router.navigate(['/employees/update-employee/' + empId]);
  }

  getAutoCompleteEmployees(status) {
    this.spinner.show();
    this.commonService.GetEmployeeSearchFilterListing(status).subscribe(
      res => {
        this.autoCompleteEmployees = [];
        this.spinner.hide();
        if (res.Status == 200) {
          res.Data.forEach(el => {
            this.autoCompleteEmployees.push({
              id: el.ID,
              name: el.Name,
            });
          });
        }
        else
          this.globalService.showNotification('Failed!!');
      },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }


}
