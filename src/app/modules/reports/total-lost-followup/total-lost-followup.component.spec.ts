import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalLostFollowupComponent } from './total-lost-followup.component';

describe('TotalLostFollowupComponent', () => {
  let component: TotalLostFollowupComponent;
  let fixture: ComponentFixture<TotalLostFollowupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalLostFollowupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalLostFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
