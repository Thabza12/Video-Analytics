import { ComponentFixture, TestBed } from '@angular/core/testing';

import { updateVideoComponent } from './update-video.component';

describe('updateVideoComponent', () => {
  let component: updateVideoComponent;
  let fixture: ComponentFixture<updateVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ updateVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(updateVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
