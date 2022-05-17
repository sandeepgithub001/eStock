import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  constructor(
    private httpService: HttpService
  ) {
  }

  public GetLeaveValueFactorByID(modal) {
    return this.httpService.post("Setting/GetLeaveValueFactorByID", modal);
  }

  public BirthdayValidation(employeeId, leaveTypeId) {
    return this.httpService.get("Leave/BirthdayValidation/" + employeeId + "/" + leaveTypeId);
  }

  public GetLeaveFactorByID(modal) {
    return this.httpService.post("Setting/GetLeaveFactorByID", modal);
  }

  public UpdateLeaveCreditFactor(modal) {
    return this.httpService.post("Setting/UpdateLeaveCreditFactor", modal);
  }

  public GetPublicHolidayList() {
    return this.httpService.get("Setting/GetPublicHolidayList");
  }

  public AddEditPublicHoliday(modal) {
    return this.httpService.post("Setting/AddEditPublicHoliday", modal);
  }
  
  public UpdateLeaveBalance(modal) {
    return this.httpService.post("Setting/UpdateLeaveBalance", modal);
  }
  
  public CalculateDiffFromAndToDate(modal) {
    return this.httpService.post("Common/CountWorkingDays", modal);
  }

  public ConfirmationApplyLeaves(modal) {
    return this.httpService.post("Leave/LeaveConfirmationMessage", modal);
  }

  public ApplyLeaves(modal) {
    return this.httpService.post("Leave/ApplyLeaves", modal);
  }

}
