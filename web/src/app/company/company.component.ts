import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  ObjCompanyList: any = [];

  constructor(
    private companyService: CompanyService
  ) {
  }

  ngOnInit(): void {
    this.GetCompanyList();
  }

  GetCompanyList() {
    this.companyService.GetCompanyList().subscribe(
      res => {
        if (res.statusCode == 200) {
          this.ObjCompanyList = res;
        }
      },
      error => {
        console.log(error);
      });
  }

}
