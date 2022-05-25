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
  ObjCompanyStock: any = {};

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.companyId = id == null ? 0 : parseInt(id);
    });
  }

  ngOnInit(): void {
    if (this.companyId > 0) {
      this.GetCompanyDetails(this.companyId);
    }
  }

  GetCompanyDetails(id: number) {
    this.companyService.GetCompanyStock(id).subscribe(
      res => {
        this.ObjCompanyStock = res;
      },
      error => {
        console.log(error);
      });
  }

}
