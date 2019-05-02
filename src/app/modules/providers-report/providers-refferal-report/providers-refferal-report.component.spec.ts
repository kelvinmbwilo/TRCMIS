import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersRefferalReportComponent } from './providers-refferal-report.component';

describe('ProvidersRefferalReportComponent', () => {
  let component: ProvidersRefferalReportComponent;
  let fixture: ComponentFixture<ProvidersRefferalReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidersRefferalReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersRefferalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
