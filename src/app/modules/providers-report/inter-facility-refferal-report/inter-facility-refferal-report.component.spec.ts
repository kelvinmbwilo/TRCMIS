import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterFacilityRefferalReportComponent } from './inter-facility-refferal-report.component';

describe('InterFacilityRefferalReportComponent', () => {
  let component: InterFacilityRefferalReportComponent;
  let fixture: ComponentFixture<InterFacilityRefferalReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterFacilityRefferalReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterFacilityRefferalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
