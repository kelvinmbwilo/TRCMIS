import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceIndicatorComponent } from './service-indicator.component';

describe('ServiceIndicatorComponent', () => {
  let component: ServiceIndicatorComponent;
  let fixture: ComponentFixture<ServiceIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
