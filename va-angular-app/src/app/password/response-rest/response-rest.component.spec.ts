import { ComponentFixture, TestBed } from '@angular/core/testing';

import { responseRestComponent } from './response-rest.component';

describe('responseRestComponent', () => {
  let component: responseRestComponent;
  let fixture: ComponentFixture<responseRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ responseRestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(responseRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
