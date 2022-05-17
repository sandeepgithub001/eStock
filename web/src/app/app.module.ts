import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppComponent } from './app.component';
import { MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { ModalModule, TimepickerModule, BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { LayoutComponent } from './Shared/_layout/layout.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(),
    { containerClass: "theme-dark-blue" },
    { dateInputFormat: 'DD-MM-YYYY' },
    { adaptivePosition: true },
    { isAnimated: true }
  );
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatAutocompleteModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    TabsModule.forRoot(),
    AngularMultiSelectModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NgbModule,
    InfiniteScrollModule,
    AutocompleteLibModule,
  ],
  providers: [
    DatePipe,
    {
      provide: BsDatepickerConfig,
      useFactory: getDatepickerConfig
    }],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
