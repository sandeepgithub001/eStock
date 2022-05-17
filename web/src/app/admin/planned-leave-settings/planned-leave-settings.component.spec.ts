import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedLeaveSettingsComponent } from './planned-leave-settings.component';

describe('PlannedLeaveSettingsComponent', () => {
  let component: PlannedLeaveSettingsComponent;
  let fixture: ComponentFixture<PlannedLeaveSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannedLeaveSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedLeaveSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
