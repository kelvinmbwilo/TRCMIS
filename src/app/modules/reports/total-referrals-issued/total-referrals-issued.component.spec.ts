import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReferralsIssuedComponent } from './total-referrals-issued.component';

describe('TotalReferralsIssuedComponent', () => {
  let component: TotalReferralsIssuedComponent;
  let fixture: ComponentFixture<TotalReferralsIssuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalReferralsIssuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalReferralsIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
