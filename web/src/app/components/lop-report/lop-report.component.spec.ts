import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LopReportComponent } from './lop-report.component';

describe('LopReportComponent', () => {
  let component: LopReportComponent;
  let fixture: ComponentFixture<LopReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LopReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LopReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
