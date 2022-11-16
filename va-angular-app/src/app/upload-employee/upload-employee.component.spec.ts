import { ComponentFixture, TestBed } from '@angular/core/testing';

import { uploadEmployeeComponent } from './upload-employee.component';

describe('uploadEmployeeComponent', () => {
  let component: uploadEmployeeComponent;
  let fixture: ComponentFixture<uploadEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ uploadEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(uploadEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
