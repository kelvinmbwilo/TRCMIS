import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersReportComponent } from './providers-report.component';

describe('ProvidersReportComponent', () => {
  let component: ProvidersReportComponent;
  let fixture: ComponentFixture<ProvidersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidersReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
