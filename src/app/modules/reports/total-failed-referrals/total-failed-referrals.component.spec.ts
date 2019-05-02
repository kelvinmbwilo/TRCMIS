import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalFailedReferralsComponent } from './total-failed-referrals.component';

describe('TotalFailedReferralsComponent', () => {
  let component: TotalFailedReferralsComponent;
  let fixture: ComponentFixture<TotalFailedReferralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalFailedReferralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalFailedReferralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
