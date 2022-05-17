import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html'

})
export class LayoutComponent implements OnInit {
  skipLinkPath: string;
  SuperMenu: any = [];

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {

    this.skipLinkPath = `${this.router.url}#main-cont`;

  }

}
