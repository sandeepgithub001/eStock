import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppConfig } from 'src/Globals/app.config';
import { SettingsService } from 'src/app/Services/settings.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-public-holidays-settings',
  templateUrl: './public-holidays-settings.component.html',
  styleUrls: ['./public-holidays-settings.component.css']
})
export class PublicHolidaysSettingsComponent implements OnInit {
  searchKey: string = "";
  statusId: string = "1";
  totalRecords: number = 0;
  publicHolidays: any = [];
  publicHolidayRequestObj: any = {};
  UpdatePublicHolidayObj: any = {};

  constructor(
    private spinner: Ng4LoadingSpinnerService,
    public globalService: AppConfig,
    private settingsService: SettingsService,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit() {
    this.getPublicHolidaysList();
  }

  onAddPublicHoliday() {
    if (this.publicHolidays.filter(x => x.isEditable == 1).length <= 0) {
      let tempList = [];
      tempList = this.publicHolidays;
      this.publicHolidays = [];
      this.publicHolidays.push({
        "Id": 0,
        "HolidayGroupTypeId": "",
        "Date": new Date(),
        "Name": "",
        "DepartMentName": "Both",
        "isEditable": 1
      });

      tempList.forEach(el => {
        this.publicHolidays.push(el)
      });
    }
  }

  onNameValueChange(val, index,type) {
    if (val.toString().trim() == "" && type != 3)
      this.publicHolidays[index].isRequired = true;
    else
      this.publicHolidays[index].isRequired = false;
  }

  onEditRow(ev, index, type) {

    if (type == 0) {  // Edit Holidays
      this.publicHolidays[index].isEditable = 2;
    }
    else if (type == 1) {  // Save New Holidays
      if (this.publicHolidays[index].Name == "" || !this.publicHolidays[index].Date) {
        this.publicHolidays[index].isRequired = true;
        return;
      }
      else
        this.publicHolidays[index].isRequired = false;

      this.UpdatePublicHolidayObj.Id = this.publicHolidays[index].Id;
      this.UpdatePublicHolidayObj.HolidayGroupTypeId = this.publicHolidays[index].HolidayGroupTypeId;
      this.UpdatePublicHolidayObj.Date = this.datePipe.transform(this.publicHolidays[index].Date, 'yyyy-MM-dd');
      this.UpdatePublicHolidayObj.Name = this.publicHolidays[index].Name;
      this.UpdatePublicHolidayObj.Active = true;

      this.AddUpdateHolidays(this.UpdatePublicHolidayObj, index, type);
    }
    else if (type == 2) {  // Update Holidays
      if (this.publicHolidays[index].Name == "" || !this.publicHolidays[index].Date) {
        this.publicHolidays[index].isRequired = true;
        return;
      }
      else
        this.publicHolidays[index].isRequired = false;

      this.UpdatePublicHolidayObj.Id = this.publicHolidays[index].Id;
      this.UpdatePublicHolidayObj.HolidayGroupTypeId = this.publicHolidays[index].HolidayGroupTypeId;
      this.UpdatePublicHolidayObj.Date = this.datePipe.transform(this.publicHolidays[index].Date, 'yyyy-MM-dd');
      this.UpdatePublicHolidayObj.Name = this.publicHolidays[index].Name;
      this.UpdatePublicHolidayObj.Active = true;

      this.AddUpdateHolidays(this.UpdatePublicHolidayObj, index, type);
    }
    else if (type == 3) {  // Delete Holidays

      this.UpdatePublicHolidayObj.Id = this.publicHolidays[index].Id;
      this.UpdatePublicHolidayObj.HolidayGroupTypeId = this.publicHolidays[index].HolidayGroupTypeId;
      this.UpdatePublicHolidayObj.Date = this.datePipe.transform(this.publicHolidays[index].Date, 'yyyy-MM-dd');
      this.UpdatePublicHolidayObj.Name = this.publicHolidays[index].Name;
      this.UpdatePublicHolidayObj.Active = false;

      this.AddUpdateHolidays(this.UpdatePublicHolidayObj, index, type);
    }
  }

  AddUpdateHolidays(modal, index, type) {
    this.spinner.show();
    this.settingsService.AddEditPublicHoliday(modal).subscribe(
      res => {
        this.spinner.hide();
        if (res.Status == 200) {
          if (type == 1)   // Save Holidays 
            this.getPublicHolidaysList();
          else if (type == 3)   // Delete Holidays
          {
            this.publicHolidays.splice(index, 1);
          }

          this.globalService.showNotification(res.Message);
          this.publicHolidays[index].isEditable = 0;
        }
        else {
          this.globalService.showNotification(res.Message);
        }

      },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  getPublicHolidaysList() {
    this.publicHolidays = [];
    this.spinner.show();
    this.settingsService.GetPublicHolidayList().subscribe(
      res => {
        this.spinner.hide();
        if (res.Status == 200) {
          this.publicHolidays = [];
          res.Data.forEach(el => {
            this.publicHolidays.push({
              "Id": el.Id,
              "HolidayGroupTypeId": el.HolidayGroupTypeId == null ? "" : el.HolidayGroupTypeId.toString(),
              "Date": new Date(el.Date),
              "Name": el.Name,
              "DepartMentName": el.DepartMentName,
              "isEditable": 0,
              "isRequired": false
            })
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

}
