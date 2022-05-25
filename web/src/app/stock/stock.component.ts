import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  ObjStockList: any = [];

  constructor(
    private companyService: CompanyService,
    private stockService: StockService
  ) {
  }

  ngOnInit(): void {
    this.GetCompanyList();
  }

  GetCompanyList() {
    this.stockService.GetStockList().subscribe(
      res => {
        this.ObjStockList = res;
      },
      error => {
        console.log(error);
      });
  }

}
