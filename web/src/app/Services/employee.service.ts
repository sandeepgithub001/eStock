import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private httpService: HttpService
  ) {
  }

  // Get Reporting Manager List
  public GetEmployeeList(modal) {
    return this.httpService.post("Employee/GetEmployeeList", modal);
  }
  // Save New Employee
  public AddEditEmployee(modal) {
    return this.httpService.post("Employee/AddEditEmployee", modal);
  }
  public GetEmployeeDetailsByID(employeeId) {
    return this.httpService.get("Employee/GetEmployeeDetailsByID/" + employeeId);
  }


}
