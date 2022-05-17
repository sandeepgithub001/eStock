import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private httpService: HttpService,
    private http: HttpClient,
  ) {
  }

  public GetEmployeeList() {
    return this.httpService.post("Common/GetEmployeeDropdownList", null);
  }

  public GetEmployeeListingRoleWise() {
    return this.httpService.post("Common/GetEmployeeListingRoleWise", null);
  }

  public GetEmployeeSearchFilterListing(status) {
    let obj = { status: status };
    return this.httpService.post("Common/GetEmployeeSearchFilterListing", obj);
  }

  public GetDepartments() {
    return this.httpService.get("Common/GetDepartmentListing");
  }

  public GetCountryCodes() {
    return this.httpService.get("Common/GetCountryCodeListing");
  }

  public GetEmployeeWiseLeaveTypes(employeeId) {
    return this.httpService.get("Common/GetEmployeeWiseLeaveTypeListing/" + employeeId);
  }

  public GetEmployeeStatus() {
    return this.httpService.get("Common/GetStatusListing");
  }

  public checkEmailNotTaken(employeeId, emailId): Observable<any> {
    return this.httpService.get("Common/CheckDuplicateEmailID/" + employeeId + "/" + emailId);
  }

  public checkEmployeeCodeNotTaken(employeeCode): Observable<any> {
    return this.httpService.get("Common/CheckEmployeeIDEsixt/" + employeeCode);
  }
}
