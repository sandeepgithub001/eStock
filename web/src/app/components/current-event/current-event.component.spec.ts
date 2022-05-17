import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentEventComponent } from './current-event.component';

describe('CurrentEventComponent', () => {
  let component: CurrentEventComponent;
  let fixture: ComponentFixture<CurrentEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
