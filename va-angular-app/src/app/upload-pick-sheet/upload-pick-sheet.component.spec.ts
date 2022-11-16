import { ComponentFixture, TestBed } from '@angular/core/testing';

import { uploadPickSheetComponent } from './upload-pick-sheet.component';

describe('uploadPickSheetComponent', () => {
  let component: uploadPickSheetComponent;
  let fixture: ComponentFixture<uploadPickSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ uploadPickSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(uploadPickSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
