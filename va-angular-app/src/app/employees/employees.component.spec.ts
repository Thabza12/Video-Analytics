import { ComponentFixture, TestBed } from '@angular/core/testing';

import { employeesComponent } from './employees.component';

describe('employeesComponent', () => {
  let component: employeesComponent;
  let fixture: ComponentFixture<employeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ employeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(employeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
