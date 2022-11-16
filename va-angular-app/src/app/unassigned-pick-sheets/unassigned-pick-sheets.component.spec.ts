import { ComponentFixture, TestBed } from '@angular/core/testing';

import { unassignedPickSheetsComponent } from './unassigned-pick-sheets.component';

describe('unassignedPickSheetsComponent', () => {
  let component: unassignedPickSheetsComponent;
  let fixture: ComponentFixture<unassignedPickSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ unassignedPickSheetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(unassignedPickSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
