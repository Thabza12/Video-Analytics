import { ComponentFixture, TestBed } from '@angular/core/testing';

import { uploadVideoComponent } from './upload-video.component';

describe('uploadVideosComponent', () => {
  let component: uploadVideoComponent;
  let fixture: ComponentFixture<uploadVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ uploadVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(uploadVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
