import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutotakenTakenRejectedCancelledLeavesComponent } from './autotaken-taken-rejected-cancelled-leaves.component';

describe('AutotakenTakenRejectedCancelledLeavesComponent', () => {
  let component: AutotakenTakenRejectedCancelledLeavesComponent;
  let fixture: ComponentFixture<AutotakenTakenRejectedCancelledLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutotakenTakenRejectedCancelledLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutotakenTakenRejectedCancelledLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
