import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveBalanceAdjustmentComponent } from './leave-balance-adjustment.component';

describe('LeaveBalanceAdjustmentComponent', () => {
  let component: LeaveBalanceAdjustmentComponent;
  let fixture: ComponentFixture<LeaveBalanceAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveBalanceAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveBalanceAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
