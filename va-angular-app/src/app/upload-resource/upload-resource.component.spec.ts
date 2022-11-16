import { ComponentFixture, TestBed } from '@angular/core/testing';

import { uploadResourceComponent } from './upload-resource.component';

describe('uploadResourceComponent', () => {
  let component: uploadResourceComponent;
  let fixture: ComponentFixture<uploadResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ uploadResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(uploadResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
