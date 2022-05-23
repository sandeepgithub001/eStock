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
        return this.httpService.get("Company");
    }

    public GetCompanyDetails(id: any) {
        return this.httpService.get("Company?id=" + id);
    }

    public UpdateCompany(data: any) {
        return this.httpService.post("Company", data);
    }

}
