import { ComponentFixture, TestBed } from '@angular/core/testing';

import { canvasViewComponent } from './canvas-view.component';

describe('canvasViewComponent', () => {
  let component: canvasViewComponent;
  let fixture: ComponentFixture<canvasViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ canvasViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(canvasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
