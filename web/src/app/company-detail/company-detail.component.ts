import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
  ObjCompanyStockList: any = [];

  constructor(
    private companyService: CompanyService
  ) {
  }

  ngOnInit(): void {
    this.GetCompanyStockList();
  }

  GetCompanyStockList() {
    this.companyService.GetCompanyList().subscribe(
      res => {
        this.ObjCompanyStockList = res;
      },
      error => {
        console.log(error);
      });
  }

}
