import { ComponentFixture, TestBed } from '@angular/core/testing';

import { uploadPickSheetDetailsComponent } from './upload-pick-sheet-details.component';

describe('uploadPickSheetDetailsComponent', () => {
  let component: uploadPickSheetDetailsComponent;
  let fixture: ComponentFixture<uploadPickSheetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ uploadPickSheetDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(uploadPickSheetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
