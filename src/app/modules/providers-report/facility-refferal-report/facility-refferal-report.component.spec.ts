import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityRefferalReportComponent } from './facility-refferal-report.component';

describe('FacilityRefferalReportComponent', () => {
  let component: FacilityRefferalReportComponent;
  let fixture: ComponentFixture<FacilityRefferalReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityRefferalReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityRefferalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
