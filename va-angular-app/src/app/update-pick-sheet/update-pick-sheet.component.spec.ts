import { ComponentFixture, TestBed } from '@angular/core/testing';

import { updatePickSheetComponent } from './update-pick-sheet.component';

describe('updatePickSheetComponent', () => {
  let component: updatePickSheetComponent;
  let fixture: ComponentFixture<updatePickSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ updatePickSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(updatePickSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
