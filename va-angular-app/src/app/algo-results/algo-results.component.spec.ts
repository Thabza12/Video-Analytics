import { ComponentFixture, TestBed } from '@angular/core/testing';

import { algoResultsComponent } from './algo-results.component';

describe('algoResultsComponent', () => {
  let component: algoResultsComponent;
  let fixture: ComponentFixture<algoResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ algoResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(algoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
