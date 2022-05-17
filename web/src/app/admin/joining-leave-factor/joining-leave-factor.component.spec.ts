import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoiningLeaveFactorComponent } from './joining-leave-factor.component';

describe('JoiningLeaveFactorComponent', () => {
  let component: JoiningLeaveFactorComponent;
  let fixture: ComponentFixture<JoiningLeaveFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoiningLeaveFactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoiningLeaveFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
