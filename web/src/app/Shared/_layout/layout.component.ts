import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html'

})
export class LayoutComponent implements OnInit {

  skipLinkPath: string;
  currentUser: User;
  user: any = {};
  SuperMenu: any = [];

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.SuperMenu = [
      { title: 'Dashboard', icon: 'home', url: '/dashboard' },
      {
        title: 'Leaves',
        icon: 'mail',
        Menu: [
          { title: 'Leaves', icon: 'mail', url: '/leaves' },
          { title: 'Leave Ledger', icon: 'document', url: '/leaves/leaves-ledger' },
          { title: 'Confirmation', icon: 'paper', url: '/leaves/confirmation' },
          { title: 'Logs', icon: 'paper', url: '/leaves/logs' },
          { title: 'Reports', icon: 'paper', url: '/leaves/reports' },
        ]
      },
      { title: 'Employees', icon: 'document', url: '/employees' },
      { title: 'Bio Metric', icon: 'paper', url: '/pendingEntries' },
      { title: 'Settings', icon: 'people', url: '/vendors' },
    ];
  }

  onToggleSidebar() {
    document.getElementById('sidebar').style.left = "0px";
    document.getElementById('wrapper').style.marginLeft = "250px";
  }

  onCloseSidebar() {
    document.getElementById('sidebar').style.left = "-250px";
    document.getElementById('wrapper').style.marginLeft = "0px";
  }

  ngOnInit() {

    this.skipLinkPath = `${this.router.url}#main-cont`;
    
  }

  onSeeAllEvent() {
    this.onCloseSidebar();
    this.router.navigate(['/events']);
  }

  onLogout() {
    this.authenticationService.logout();
  }
}
