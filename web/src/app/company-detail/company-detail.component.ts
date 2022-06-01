import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  companyId: number = 0;
  startDate: Date = new Date();
  endDate: Date = new Date();
  ObjCompanyStock: any = {};
  ObjSearchModel: any = {};

  objMin: number = 0;
  objMax: number = 0;
  objAverage: number = 0;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
  ) {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.companyId = id == null ? 0 : parseInt(id);
    });
  }

  ngOnInit(): void {
    if (this.companyId > 0) {
      this.ObjSearchModel.companyId = this.companyId;
      this.ObjSearchModel.startDate = this.startDate;
      this.ObjSearchModel.endDate = this.endDate;
      this.GetCompanyDetails(this.ObjSearchModel);
    }
  }

  GetCompanyDetails(model: any) {
    
    model.startDate =  this.datepipe.transform(model.startDate, 'yyyy-MM-dd');
    model.endDate = this.datepipe.transform(model.endDate, 'yyyy-MM-dd');

    console.log(model);
    this.companyService.GetCompanyStock(model).subscribe(
      res => {
        this.ObjCompanyStock = res;
        var stocks = res.stocks;
        var lowestNumber = stocks[0].stockPrice;
        var highestNumber = stocks[0].stockPrice;    
        
        stocks.forEach(function (keyValue: { stockPrice: number; }, index: number, stocks: any) {
          if(index > 0) {
            if(keyValue.stockPrice < lowestNumber){
              lowestNumber = keyValue.stockPrice;
            }
            if(keyValue.stockPrice > highestNumber) {
              highestNumber = keyValue.stockPrice;
            }
          }
        });

        var sum = 0;
        for (var i = 0; i < stocks.length; i++) {
          sum += parseInt(stocks[i].stockPrice, 10); //don't forget to add the base
        }

        var avg = sum/stocks.length;

        this.objMin = lowestNumber;
        this.objMax = highestNumber;
        this.objAverage = avg;

      },
      error => {
        console.log(error);
      });
  }

  OnDateChange(ev: any) {
    this.ObjSearchModel.companyId = this.companyId;
    this.ObjSearchModel.startDate = this.startDate;
    this.ObjSearchModel.endDate = this.endDate;
    this.GetCompanyDetails(this.ObjSearchModel);
  }
}
