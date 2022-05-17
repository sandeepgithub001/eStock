import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppConfig } from 'src/Globals/app.config';
import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthenticationService } from '../Services/authentication.service';
import { environment } from 'src/environments/environment';



@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
    response: any = {};
    user: SocialUser;
    loggedIn: boolean;
    userData: any = [];
    returnUrl: string;


    constructor(
        private spinner: Ng4LoadingSpinnerService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        public globalService: AppConfig,
        private authService: AuthService,
        private permissionsService: NgxPermissionsService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/dashboard']);
        }
    }


    ngOnInit() {
        this.loggedIn = false;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.authService.signOut();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = (user != null);
            if (this.loggedIn)
                this.validateLoginUser(this.user);
        });
    }

    validateLoginUser(modal) {
        this.spinner.show();

        // if (!environment.production)
        //     modal.email = "ambika.rana@onebcg.com";
        //     modal.email = "virendra.kumar@onebcg.com";

        this.authenticationService.validateUser(modal).subscribe(
            response => {
                this.spinner.hide();
                if (response.Status == 200) {
                    this.userData = JSON.parse(localStorage.getItem('currentUser'));
                    if (this.userData.userRoleId == 1) {
                        const perm = ["Admin", "HR"];
                        this.permissionsService.loadPermissions(perm);
                    }
                    else if (this.userData.userRoleId == 2) {
                        const perm = ["ProjectManager"];
                        this.permissionsService.loadPermissions(perm);
                    }
                    else if (this.userData.userRoleId == 3) {
                        const perm = ["ReportingManager"];
                        this.permissionsService.loadPermissions(perm);
                    }
                    else if (this.userData.userRoleId == 4) {
                        const perm = ["Employee"];
                        this.permissionsService.loadPermissions(perm);
                    }
                    this.router.navigate([this.returnUrl]);
                }
                else {
                    this.globalService.showNotification(response.Message);
                }
            },
            error => {
                this.spinner.hide();
                console.log(error);
                console.log(error);
            });
    }
}
