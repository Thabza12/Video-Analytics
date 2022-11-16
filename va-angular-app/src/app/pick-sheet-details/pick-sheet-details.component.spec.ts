import { ComponentFixture, TestBed } from '@angular/core/testing';

import { pickSheetDetailsComponent } from './pick-sheet-details.component';

describe('pickSheetDetailsComponent', () => {
  let component: pickSheetDetailsComponent;
  let fixture: ComponentFixture<pickSheetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ pickSheetDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(pickSheetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
