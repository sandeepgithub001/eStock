import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyLeaveFactorComponent } from './loyalty-leave-factor.component';

describe('LoyaltyLeaveFactorComponent', () => {
  let component: LoyaltyLeaveFactorComponent;
  let fixture: ComponentFixture<LoyaltyLeaveFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyLeaveFactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyLeaveFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
