import { ComponentFixture, TestBed } from '@angular/core/testing';

import { updatePickSheetDetailsComponent } from './update-pick-sheet-details.component';

describe('updatePickSheetDetailsComponent', () => {
  let component: updatePickSheetDetailsComponent;
  let fixture: ComponentFixture<updatePickSheetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ updatePickSheetDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(updatePickSheetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
