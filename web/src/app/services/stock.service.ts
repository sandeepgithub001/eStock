import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class StockService {

    constructor(
        private httpService: HttpService,
    ) {
    }

    public GetStockList() {
        return this.httpService.get("Stock");
    }

    public GetStockById(id: number) {
        return this.httpService.get("Stock/" + id);
    }

    public UpdateStock(data: any) {
        return this.httpService.post("Stock", data);
    }

}
