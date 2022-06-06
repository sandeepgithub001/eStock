import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from './services/company.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'estock';
  objCompanyId: number = 0;
  objCompanies: any = [];

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.GetCompanyList();
  }

  OnButtonSearchClick() {
    if (this.objCompanyId > 0) {
      this.router.navigate(['company/', this.objCompanyId])
        .then(() => {
          window.location.reload();
        });
    }
  }

  GetCompanyList() {
    this.companyService.GetCompanyList().subscribe(
      res => {
        this.objCompanies = res;
      },
      error => {
        console.log(error);
      });
  }

}