import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
import * as jwt_decode from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isTokenExpired()) {
            const currentUser = this.authenticationService.currentUserValue;
            if (currentUser) {
                // logged in so return true
                return true;
            }
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
    }

    getToken(): string {
        return JSON.parse(localStorage.getItem('token'));
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) return null;
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        token = this.getToken();
        if (!token) return false;
        const date = this.getTokenExpirationDate(token);
        if (date === undefined) return false;
        return (date.valueOf() > new Date().valueOf());
    }
}