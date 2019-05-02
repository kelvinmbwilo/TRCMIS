import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSuccessfulComponent } from './total-successful.component';

describe('TotalSuccessfulComponent', () => {
  let component: TotalSuccessfulComponent;
  let fixture: ComponentFixture<TotalSuccessfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalSuccessfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
