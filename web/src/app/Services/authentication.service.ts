import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public validateUser(loginmodel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${environment.apiEndpoint}/api/Authenticate`, loginmodel, { headers: headers })
            .pipe(map(res => {

                if (res.Status == 200) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', JSON.stringify(res.Data.Token));

                    let userObj = {
                        userId: res.Data.UserId,
                        userName: res.Data.UserName,
                        emailId: res.Data.EmailId,
                        userRoleId: res.Data.RoleId,
                        userRole: res.Data.RoleName,
                        token: res.Data.Token
                    };

                    localStorage.setItem('currentUser', JSON.stringify(userObj));

                    this.currentUserSubject.next(userObj);
                }
                return res;
            }),
                catchError(this.handleError)
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.authService.signOut();
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something went wrong. Please try again.');
    }
}