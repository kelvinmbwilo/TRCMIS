import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDataTableComponent } from './main-data-table.component';

describe('MainDataTableComponent', () => {
  let component: MainDataTableComponent;
  let fixture: ComponentFixture<MainDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
