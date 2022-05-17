import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable({
    providedIn: 'root'
})
export class HttpService {
    userData: any = {};
    token: string = "";

    constructor(
        private http: HttpClient,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {
        this.userData = JSON.parse(localStorage.getItem('user'));
        this.token = JSON.parse(localStorage.getItem('token'));
    }


    public post(serviceName, modal) {
        console.log(JSON.stringify(modal));
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(environment.apiEndpoint + "/api/" + serviceName, JSON.stringify(modal), { headers: headers })
            .pipe(tap(data => {
                console.log(data);
                return data;
            }),
                catchError(
                    (err, caught) => {
                        if (err.status === 401) {
                            this.handleAuthError();
                        }
                        return throwError(err);
                    }
                )
            );
    }

    public postImage(serviceName, modal) {
        console.log(JSON.stringify(modal));
        // let headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });
        // headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(environment.apiEndpoint + "/api/" + serviceName, modal)
            .pipe(tap(data => {
                console.log(data);
                return data;
            }),
                catchError(
                    (err, caught) => {
                        if (err.status === 401) {
                            this.handleAuthError();
                        }
                        return throwError(err);
                    }
                )
            );
    }

    public logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    public get(serviceName) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<any>(environment.apiEndpoint + "/api/" + serviceName, { headers: headers })
            .pipe(tap(data => {
                console.log(data);
                return data;
            }),
                catchError(
                    (err, caught) => {
                        if (err.status === 401) {
                            this.handleAuthError();
                        }
                        return throwError(err);
                    }
                )
            );
    }

    private handleAuthError() {
        console.log("UnAuthorized","User session expired.")
        this.authenticationService.logout();
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