import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppConfig } from 'src/Globals/app.config';
import { SettingsService } from 'src/app/Services/settings.service';

@Component({
  selector: 'app-planned-leave-settings',
  templateUrl: './planned-leave-settings.component.html',
  styleUrls: ['./planned-leave-settings.component.css']
})
export class PlannedLeaveSettingsComponent implements OnInit {
  leaveFactorId = 400004;
  searchKey: string = "";
  statusId: string = "1";
  totalRecords: number = 0;
  leaveFactors: any = [];
  leaveFactorRequestObj: any = {};
  UpdateLeaveFactorObj: any = {};

  constructor(
    private spinner: Ng4LoadingSpinnerService,
    public globalService: AppConfig,
    private settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    this.leaveFactorRequestObj.Id = this.leaveFactorId;
    this.getLeaveFactorList(this.leaveFactorRequestObj);
  }

  onFactorValueChange(index, val) {
    if (val == "")
      this.leaveFactors[index].isDisabled = true;
    else
      this.leaveFactors[index].isDisabled = false;
  }


  onKeyEnter(index, val) {
    this.onEditRow(val, index);
  }

  onEditRow(ev, index) {
    if (!this.leaveFactors[index].isEditable) {
      this.leaveFactors[index].isEditable = true;
    }
    else if (this.leaveFactors[index].isEditable) {     

      this.UpdateLeaveFactorObj.id = this.leaveFactors[index].Id;
      this.UpdateLeaveFactorObj.leaveFactorTypeId = this.leaveFactors[index].LeaveFactorTypeId;
      this.UpdateLeaveFactorObj.rangeFrom = parseFloat(this.leaveFactors[index].RangeFrom);
      this.UpdateLeaveFactorObj.rangeTo = parseFloat(this.leaveFactors[index].RangeTo);
      this.UpdateLeaveFactorObj.factorValue = parseFloat(this.leaveFactors[index].FactorValue);
      this.UpdateLeaveFactorObj.updatedBy = this.leaveFactors[index].UpdatedBy;

      this.UpdateLeaveFactor(index, this.UpdateLeaveFactorObj);
    }
  }

  UpdateLeaveFactor(index, modal) {
    this.spinner.show();
    this.settingsService.UpdateLeaveCreditFactor(modal).subscribe(
      res => {
        this.spinner.hide();
        if (res.Status == 200) {
          this.leaveFactors[index].isEditable = false;
          this.globalService.showNotification(res.Message);
        }
        else
        {
          this.leaveFactors[index].isEditable = true;
          this.globalService.showNotification(res.Message);
        }
      },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  getLeaveFactorList(modal) {
    this.spinner.show();
    this.settingsService.GetLeaveValueFactorByID(modal).subscribe(
      res => {
        this.spinner.hide();
        if (res.Status == 200) {
          this.leaveFactors = res.Data;
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
