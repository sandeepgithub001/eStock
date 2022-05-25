import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.scss']
})
export class UpdateCompanyComponent implements OnInit {
  ObjForm!: FormGroup;
  submitted = false;
  companyId: number = 0;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.companyId = id == null ? 0 : parseInt(id);
      if (this.companyId > 0) {
        this.GetCompanyDetails(this.companyId);
      }
    });
  }

  ngOnInit(): void {
    this.ObjForm = this.fb.group({
      id: [this.companyId],
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      ceo: [],
      trunOver: [],
      website: [],
      stockExchange: []
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

    this.companyService.UpdateCompany(this.ObjForm.value).subscribe(
      res => {
        if (res > 0) {
          alert('Success!');
          this.router.navigate(['/company']);
        }
        else {
          alert('Failed!');
        }
      },
      error => {
        console.log(error);
      });
  }

  GetCompanyDetails(id: number) {
    this.companyService.GetCompanyById(id).subscribe(
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


  onCancel(ev: any) {
    this.router.navigate(['/company']);
  }
}
