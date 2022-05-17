import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHolidaysSettingsComponent } from './public-holidays-settings.component';

describe('PublicHolidaysSettingsComponent', () => {
  let component: PublicHolidaysSettingsComponent;
  let fixture: ComponentFixture<PublicHolidaysSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicHolidaysSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicHolidaysSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
