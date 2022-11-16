import { ComponentFixture, TestBed } from '@angular/core/testing';

import { pickSheetComponent } from './pick-sheet.component';

describe('pickSheetComponent', () => {
  let component: pickSheetComponent;
  let fixture: ComponentFixture<pickSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ pickSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(pickSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
