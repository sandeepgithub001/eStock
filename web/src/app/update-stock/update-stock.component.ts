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
      if (this.companyId > 0) {
        this.GetStockById(this.companyId);
      }
    });
    this.GetCompanyList();
  }

  ngOnInit(): void {
    this.ObjForm = this.fb.group({
      id: [this.companyId],
      companyId: ['', [Validators.required]],
      stockPrice: ['', [Validators.required]],
      startdate: [new Date()],
      endDate: [new Date()],
    });
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
          this.router.navigate(['/stock']);
        }
        else {
          alert('Failed!');
        }
      },
      error => {
        console.log(error);
      });
  }


  GetStockById(id: number) {
    this.stockService.GetStockById(id).subscribe(
      res => {
        this.ObjForm.patchValue({
          id: res.id,
          code: res.code,
          name: res.name,
          ceo: res.ceo,
          trunOver: res.trunOver,
          website: res.website,
          stockExchange: res.stockExchange,
        });
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
    this.router.navigate(['/stock']);
  }
}
