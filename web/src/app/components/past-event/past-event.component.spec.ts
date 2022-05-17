import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastEventComponent } from './past-event.component';

describe('PastEventComponent', () => {
  let component: PastEventComponent;
  let fixture: ComponentFixture<PastEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
