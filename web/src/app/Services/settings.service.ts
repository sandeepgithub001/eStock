import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private httpService: HttpService
  ) {
  }

  public GetLeaveValueFactorByID(modal) {
    return this.httpService.post("Setting/GetLeaveValueFactorByID", modal);
  }

  public GetLeaveFactorByID(modal) {
    return this.httpService.post("Setting/GetLeaveFactorByID", modal);
  }

  public UpdateLeaveCreditFactor(modal) {
    return this.httpService.post("Setting/UpdateLeaveCreditFactor", modal);
  }

  public UpdateJoiningLeaveFactor(modal) {
    return this.httpService.post("Setting/UpdateJoiningLeaveFactor", modal);
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
}
