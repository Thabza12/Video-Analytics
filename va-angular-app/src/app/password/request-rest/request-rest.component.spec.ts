import { ComponentFixture, TestBed } from '@angular/core/testing';

import { requestRestComponent } from './request-rest.component';

describe('requestRestComponent', () => {
  let component: requestRestComponent;
  let fixture: ComponentFixture<requestRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ requestRestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(requestRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
