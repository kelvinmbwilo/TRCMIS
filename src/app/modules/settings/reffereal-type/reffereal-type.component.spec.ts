import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferealTypeComponent } from './reffereal-type.component';

describe('RefferealTypeComponent', () => {
  let component: RefferealTypeComponent;
  let fixture: ComponentFixture<RefferealTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefferealTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefferealTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
