import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulMaraliaReferalsComponent } from './successful-maralia-referals.component';

describe('SuccessfulMaraliaReferalsComponent', () => {
  let component: SuccessfulMaraliaReferalsComponent;
  let fixture: ComponentFixture<SuccessfulMaraliaReferalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulMaraliaReferalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulMaraliaReferalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
