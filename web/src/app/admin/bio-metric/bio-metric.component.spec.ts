import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioMetricComponent } from './bio-metric.component';

describe('BioMetricComponent', () => {
  let component: BioMetricComponent;
  let fixture: ComponentFixture<BioMetricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioMetricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
