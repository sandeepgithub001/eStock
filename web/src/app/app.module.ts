import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { UpdateCompanyComponent } from './update-company/update-company.component';
import { UpdateStockComponent } from './update-stock/update-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { StockComponent } from './stock/stock.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    UpdateCompanyComponent,
    UpdateStockComponent,
    CompanyDetailComponent,
    StockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,        
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
