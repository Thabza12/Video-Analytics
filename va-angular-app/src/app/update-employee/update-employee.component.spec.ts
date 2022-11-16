import { ComponentFixture, TestBed } from '@angular/core/testing';

import { updateEmployeeComponent } from './update-employee.component';

describe('updateEmployeeComponent', () => {
  let component: updateEmployeeComponent;
  let fixture: ComponentFixture<updateEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ updateEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(updateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
