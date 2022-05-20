import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.scss']
})
export class UpdateCompanyComponent implements OnInit {
  ObjForm!: FormGroup;



  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.ObjForm = this.fb.group({
      id: [],
      code: [],
      name: [],
      ceo: [],
      trunOver: [],
      website: [],
      stockExchange: []
    });
  }

  onSubmit(ev: any) {
    this.companyService.GetCompanyList().subscribe(
      res => {
        if (res.statusCode == 200) {
          alert('Success!');
        }
      },
      error => {
        console.log(error);
      });
  }

  onCancel(ev: any) {
    this.router.navigate(['/company']);
  }
}
