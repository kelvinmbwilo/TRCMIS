import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRegisteredClientsComponent } from './total-registered-clients.component';

describe('TotalRegisteredClientsComponent', () => {
  let component: TotalRegisteredClientsComponent;
  let fixture: ComponentFixture<TotalRegisteredClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalRegisteredClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalRegisteredClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
