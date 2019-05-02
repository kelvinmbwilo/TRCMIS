import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationReasonComponent } from './registration-reason.component';

describe('RegistrationReasonComponent', () => {
  let component: RegistrationReasonComponent;
  let fixture: ComponentFixture<RegistrationReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
