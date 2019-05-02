import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalIssuedLostFollowupComponent } from './total-issued-lost-followup.component';

describe('TotalIssuedLostFollowupComponent', () => {
  let component: TotalIssuedLostFollowupComponent;
  let fixture: ComponentFixture<TotalIssuedLostFollowupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalIssuedLostFollowupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalIssuedLostFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
