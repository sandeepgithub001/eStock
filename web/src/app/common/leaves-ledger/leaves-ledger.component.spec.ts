import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesLedgerComponent } from './leaves-ledger.component';

describe('LeavesLedgerComponent', () => {
  let component: LeavesLedgerComponent;
  let fixture: ComponentFixture<LeavesLedgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavesLedgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
