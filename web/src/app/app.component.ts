import { Component, Inject, HostListener } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';
import { User } from './models/user';
import { AuthenticationService } from './Services/authentication.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private permissionsService: NgxPermissionsService,
    private authenticationService: AuthenticationService,
    @Inject(DOCUMENT) document
  ) {

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    setTheme('bs4'); // or 'bs3'.

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          } else {
            return null;
          }
        }
        return null;
      })
    ).subscribe((data: any) => {
      if (data) {
        this.titleService.setTitle(data + ' - ONE Casa');
      }
    });
  }

  ngOnInit(): void {

    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };

    // this.router.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //     this.router.navigated = false;
    //     window.scrollTo(0, 0);
    //   }
    // });

    this.setUserPermissons();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 300) {
      let element = document.getElementById('sticky-header');
      if (element != null)
        element.classList.add('sticky');
    } else {
      let element = document.getElementById('sticky-header');
      if (element != null)
        element.classList.remove('sticky');
    }
  }

  setUserPermissons() {

    if (this.currentUser.userRoleId == 1) {
      const perm = ["Admin", "HR"];
      this.permissionsService.loadPermissions(perm);
    }
    else if (this.currentUser.userRoleId == 2) {
      const perm = ["ProjectManager"];
      this.permissionsService.loadPermissions(perm);
    }
    else if (this.currentUser.userRoleId == 3) {
      const perm = ["ReportingManager"];
      this.permissionsService.loadPermissions(perm);
    }
    else if (this.currentUser.userRoleId == 4) {
      const perm = ["Employee"];
      this.permissionsService.loadPermissions(perm);
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
