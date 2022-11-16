import { ComponentFixture, TestBed } from '@angular/core/testing';

import { updateAlgoResultsComponent } from './update-algo-results.component';

describe('updateAlgoResultsComponent', () => {
  let component: updateAlgoResultsComponent;
  let fixture: ComponentFixture<updateAlgoResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ updateAlgoResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(updateAlgoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
