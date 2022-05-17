import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    setTheme('bs4'); // or 'bs3'.
  }

  ngOnInit(): void {

  }

}
