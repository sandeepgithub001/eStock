import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnplannedLeaveSettingsComponent } from './unplanned-leave-settings.component';

describe('UnplannedLeaveSettingsComponent', () => {
  let component: UnplannedLeaveSettingsComponent;
  let fixture: ComponentFixture<UnplannedLeaveSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnplannedLeaveSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnplannedLeaveSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
