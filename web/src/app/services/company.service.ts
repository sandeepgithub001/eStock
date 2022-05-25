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

    public GetCompanyById(id: number) {
        return this.httpService.get("Company/" + id);
    }

    public GetCompanyStock(id: number) {
        return this.httpService.get("Company/GetCompanyStock/" + id);
    }

    public UpdateCompany(data: any) {
        return this.httpService.post("Company", data);
    }

}
