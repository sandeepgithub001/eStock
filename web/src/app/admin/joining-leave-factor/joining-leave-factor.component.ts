import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppConfig } from 'src/Globals/app.config';
import { SettingsService } from 'src/app/Services/settings.service';

@Component({
  selector: 'app-joining-leave-factor',
  templateUrl: './joining-leave-factor.component.html',
  styleUrls: ['./joining-leave-factor.component.css']
})
export class JoiningLeaveFactorComponent implements OnInit {
  leaveFactorId = 400003;
  searchKey: string = "";
  statusId: string = "1";
  totalRecords: number = 0;
  leaveFactors: any = [];
  leaveFactorRequestObj: any = {};
  isEditable: boolean = false;


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


  onRangeValueKeyEnter(index, val) {
    this.onEditRow(val, index);
  }


  onRangeValueChange(index, val) {
    if (val == "")
      this.leaveFactors[index].isDisabled = true;
    else
      this.leaveFactors[index].isDisabled = false;
  }


  onEditRow(ev, index) {

    if (index === 1) {
      this.isEditable = true;
    }
    else if (index === 2) {

      let isValid = false;

      for (let i = 0; i < this.leaveFactors.length; i++) {
        if ((this.leaveFactors[i].RangeFrom === "0" || this.leaveFactors[i].RangeTo === "0") || (this.leaveFactors[i].RangeFrom === "" || this.leaveFactors[i].RangeTo === "")) {
          this.globalService.showNotification("Please enter a valid value.");
          isValid = true;
          break;
        }
        else {
          if (parseInt(this.leaveFactors[i].RangeTo) > 31 || parseInt(this.leaveFactors[i].RangeFrom) > 31) {
            this.globalService.showNotification("Please enter a valid value.");
            isValid = true;
            break;
          }
          if (parseInt(this.leaveFactors[i].RangeFrom) === parseInt(this.leaveFactors[i].RangeTo)) {
            this.globalService.showNotification("Value in To Day and From Day cannot be same.");
            isValid = true;
            break;
          }
          if ((parseInt(this.leaveFactors[i].RangeTo) < parseInt(this.leaveFactors[i].RangeFrom))) {
            this.globalService.showNotification("Value in 'To Day' must be greater than 'From Day'");
            isValid = true;
            break;
          }
        }
      };

      if (isValid) {
        return;
      }

      let UpdateLeaveFactorObj = [];
      this.leaveFactors.forEach(el => {
        UpdateLeaveFactorObj.push({
          id: el.Id,
          leaveFactorTypeId: el.LeaveFactorTypeId,
          rangeFrom: parseFloat(el.RangeFrom),
          rangeTo: parseFloat(el.RangeTo),
          factorValue: parseFloat(el.FactorValue),
          updatedBy: el.UpdatedBy,
        })
      });

      this.UpdateLeaveFactor(UpdateLeaveFactorObj, index);
    }
    else if (index === 0) {
      this.isEditable = false;
      this.getLeaveFactorList(this.leaveFactorRequestObj);
    }
  }

  UpdateLeaveFactor(modal, index) {
    this.spinner.show();
    this.settingsService.UpdateJoiningLeaveFactor(modal).subscribe(
      res => {
        this.spinner.hide();
        if (res.Status == 200) {
          this.isEditable = false;
          this.globalService.showNotification(res.Message);
        }
        else {
          this.isEditable = true;
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
