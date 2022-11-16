import { ComponentFixture, TestBed } from '@angular/core/testing';

import { videoComponent } from './video.component';

describe('videoComponent', () => {
  let component: videoComponent;
  let fixture: ComponentFixture<videoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ videoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(videoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
