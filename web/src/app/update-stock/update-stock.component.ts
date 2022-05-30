import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent implements OnInit {
  ObjForm!: FormGroup;
  submitted = false;
  companyId: number = 0;
  objCompanies: any = [];

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private stockService: StockService,
    private datepipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.companyId = id == null ? 0 : parseInt(id);
    });
  }

  ngOnInit(): void {
    this.ObjForm = this.fb.group({
      id: [0],
      companyId: [this.companyId, [Validators.required]],
      companyName: ['', [Validators.required]],
      stockPrice: ['', [Validators.required]],
      startDate: [new Date()],
      endDate: [new Date()],
    });
    if (this.companyId > 0) {
      this.GetCompanyById(this.companyId);
    }
  }

  //convenience getter for easy access to form fields
  get form(): { [key: string]: AbstractControl; } {
    return this.ObjForm.controls;
  }

  onSubmit(ev: any) {
    this.submitted = true;
    if (this.ObjForm.invalid) {
      return;
    }

    this.datepipe.transform(this.ObjForm.value.startDate, 'yyyy-MM-dd');
    this.datepipe.transform(this.ObjForm.value.endDate, 'yyyy-MM-dd');

    this.stockService.UpdateStock(this.ObjForm.value).subscribe(
      res => {
        if (res > 0) {
          alert('Success!');
          this.router.navigate(['/company/', this.companyId]);
        }
        else {
          alert('Failed!');
        }
      },
      error => {
        console.log(error);
      });
  }

  GetCompanyById(id: number) {
    this.companyService.GetCompanyById(id).subscribe(
      res => {
        this.ObjForm.controls["companyName"].setValue(res.companyName);
      },
      error => {
        console.log(error);
      });
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


  onCancel(ev: any) {
    this.router.navigate(['/company/', this.companyId]);
  }
}
