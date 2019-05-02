import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferealFeedbackComponent } from './reffereal-feedback.component';

describe('RefferealFeedbackComponent', () => {
  let component: RefferealFeedbackComponent;
  let fixture: ComponentFixture<RefferealFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefferealFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefferealFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
