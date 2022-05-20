import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { UpdateCompanyComponent } from './update-company/update-company.component';

const routes: Routes = [
  { path: 'company', component: CompanyComponent },
  { path: 'update-company/:id', component: UpdateCompanyComponent },
  { path: 'stock', component: CompanyComponent },
  { path: '', redirectTo: '/company', pathMatch: 'full' }, // redirect to company
  { path: '**', component: CompanyComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
