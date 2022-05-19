import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class HttpService {
    userData: any = {};
    token: string = "";

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
    }

    public post(serviceName: string, modal: any) {
        console.log(JSON.stringify(modal));
        return this.http.post<any>(environment.apiUrl + serviceName, modal)
            .pipe(
                map((res) => {
                    console.log(res);
                    return res;
                })
            );
    }
    
    public get(serviceName: string) {
        return this.http.get<any>(environment.apiUrl + serviceName)
            .pipe(
                map((res) => {
                    console.log(res);
                    return res;
                })
            );
    }

    private handleAuthError() {
        console.log("UnAuthorized", "User session expired.")
        this.router.navigate(['/login']);
    }

    private handleError(error: HttpErrorResponse) {
        let error_msg = "";
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            error_msg = 'An error occurred:', error.error.message;
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            error_msg = `Backend returned code ${error.status}. ` + `Something went wrong. Please try again.`;
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(error_msg);
    }
}