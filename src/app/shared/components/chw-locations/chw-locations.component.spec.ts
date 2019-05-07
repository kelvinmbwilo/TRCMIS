import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChwLocationsComponent } from './chw-locations.component';

describe('ChwLocationsComponent', () => {
  let component: ChwLocationsComponent;
  let fixture: ComponentFixture<ChwLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChwLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChwLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
