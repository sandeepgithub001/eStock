import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    constructor(
        private httpService: HttpService,
    ) {
    }

    public GetCompanyList() {
        return this.httpService.get("Company/Get");
    }

    public UpdateCompany(data: any) {
        return this.httpService.post("Company/Get", data);
    }

}
