import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeavesComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    
  }

  ngOnInit() {

  }

  onSelect(tabId: number) {

  }
}
