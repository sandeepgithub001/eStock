import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyLeaveFactorComponent } from './monthly-leave-factor.component';

describe('MonthlyLeaveFactorComponent', () => {
  let component: MonthlyLeaveFactorComponent;
  let fixture: ComponentFixture<MonthlyLeaveFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyLeaveFactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyLeaveFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
