import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingApprovedLeavesComponent } from './pending-approved-leaves.component';

describe('PendingApprovedLeavesComponent', () => {
  let component: PendingApprovedLeavesComponent;
  let fixture: ComponentFixture<PendingApprovedLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingApprovedLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingApprovedLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
